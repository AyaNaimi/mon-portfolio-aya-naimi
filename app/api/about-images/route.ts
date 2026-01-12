import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No valid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7) // Remove 'Bearer ' prefix
    const supabase = await createClient()

    // Verify the JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth verification failed:', authError)
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      )
    }

    console.log('Authenticated user:', user.email)

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Normalize and check file type
    let normalizedMimeType = file.type.toLowerCase()
    console.log('Received file MIME type:', file.type, 'normalized to:', normalizedMimeType)
    
    // Handle jpg vs jpeg
    if (normalizedMimeType === 'image/jpg') {
      normalizedMimeType = 'image/jpeg'
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(normalizedMimeType)) {
      console.log('File type rejected:', normalizedMimeType, 'not in allowed types:', allowedTypes)
      return NextResponse.json(
        { error: 'Only JPG, PNG and WebP images are allowed' },
        { status: 400 }
      )
    }
    
    console.log('File type accepted:', normalizedMimeType)
    
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 2MB' },
        { status: 400 }
      )
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `profile-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `about-images/${fileName}`

    // Upload file to Supabase Storage (images bucket)
    console.log('Uploading to storage:', {
      bucket: 'portfolio-images',
      path: filePath,
      fileType: file.type,
      fileSize: file.size,
      fileName: file.name,
      user: user.email
    })
    
    const { data: storageData, error: storageError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file)

    if (storageError) {
      console.error('[Profile Image Upload] Storage error:', storageError)
      console.error('[Profile Image Upload] Error details:', {
        message: storageError.message,
        name: storageError.name
      })
      return NextResponse.json(
        { error: 'Failed to upload image to storage' },
        { status: 500 }
      )
    }
    
    console.log('[Profile Image Upload] Storage upload successful:', storageData)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath)

    // Deactivate all existing images first
    await supabase
      .from('about_images')
      .update({ is_active: false })
      .neq('id', '00000000-0000-0000-0000-000000000000') // Update all records

    // Insert new image record into database
    const { data: imageData, error: dbError } = await supabase
      .from('about_images')
      .insert({
        filename: fileName,
        original_filename: file.name,
        file_size: file.size,
        file_type: normalizedMimeType,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        is_active: true
      })
      .select()
      .single()

    if (dbError) {
      // If DB insert fails, delete uploaded file
      await supabase.storage.from('portfolio-images').remove([filePath])
      console.error('[Profile Image Upload] Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save image metadata' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile image uploaded successfully',
      data: imageData
    })
  } catch (error) {
    console.error('[Profile Image Upload] Error:', error)
    return NextResponse.json(
      { error: 'Failed to upload profile image' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No valid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7) // Remove 'Bearer ' prefix
    const supabase = await createClient()

    // Verify the JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth verification failed:', authError)
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      )
    }

    console.log('Authenticated user for delete:', user.email)
    
    // Get the current active image
    const { data: activeImage } = await supabase
      .from('about_images')
      .select('*')
      .eq('is_active', true)
      .single()

    if (!activeImage) {
      return NextResponse.json(
        { error: 'No active image found' },
        { status: 404 }
      )
    }

    // Delete from storage
    if (activeImage.storage_path) {
      const { error: storageError } = await supabase.storage
        .from('portfolio-images')
        .remove([activeImage.storage_path])

      if (storageError) {
        console.error('[Profile Image Delete] Storage error:', storageError)
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('about_images')
      .delete()
      .eq('id', activeImage.id)

    if (dbError) {
      console.error('[Profile Image Delete] Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to delete image from database' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile image deleted successfully'
    })
  } catch (error) {
    console.error('[Profile Image Delete] Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete profile image' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Fetch profile image from database
    const { data: profileImage, error } = await supabase
      .from('about_images')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('[About Images API] Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch profile image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: profileImage || null
    })
  } catch (error) {
    console.error('[About Images API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile image data' },
      { status: 500 }
    )
  }
}
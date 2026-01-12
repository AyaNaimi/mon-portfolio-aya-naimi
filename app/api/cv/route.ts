import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Fetch all CV files from database
    const { data: cvFiles, error } = await supabase
      .from('cv_files')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (error) {
      console.error('[CV API] Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch CV files' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: cvFiles || []
    })
  } catch (error) {
    console.error('[CV API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CV data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF and DOC files are allowed' },
        { status: 400 }
      )
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `cv/${fileName}`

    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('portfolio-storage')
      .upload(filePath, file)

    if (storageError) {
      console.error('[CV Upload] Storage error:', storageError)
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('portfolio-storage')
      .getPublicUrl(filePath)

    // Check if this is the first CV (will be active by default)
    const { data: existingCVs } = await supabase
      .from('cv_files')
      .select('id')
      .limit(1)

    const isFirstCV = !existingCVs || existingCVs.length === 0

    // Insert CV record into database
    const { data: cvData, error: dbError } = await supabase
      .from('cv_files')
      .insert({
        filename: fileName,
        original_filename: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        is_active: isFirstCV
      })
      .select()
      .single()

    if (dbError) {
      // If DB insert fails, delete uploaded file
      await supabase.storage.from('portfolio-storage').remove([filePath])
      console.error('[CV Upload] Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save CV metadata' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'CV file uploaded successfully',
      data: cvData
    })
  } catch (error) {
    console.error('[CV Upload] Error:', error)
    return NextResponse.json(
      { error: 'Failed to upload CV file' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cvId = params.id
    const supabase = await createClient()
    
    // Fetch CV metadata from database
    const { data: cvData, error } = await supabase
      .from('cv_files')
      .select('*')
      .eq('id', cvId)
      .single()

    if (error || !cvData) {
      console.error('[CV Download] CV not found:', error)
      return NextResponse.json(
        { error: 'CV file not found' },
        { status: 404 }
      )
    }

    // Download file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('portfolio-storage')
      .download(cvData.storage_path)

    if (downloadError) {
      console.error('[CV Download] Storage error:', downloadError)
      return NextResponse.json(
        { error: 'Failed to download file from storage' },
        { status: 500 }
      )
    }

    // Create response with file
    const response = new NextResponse(fileData)
    
    // Set appropriate headers
    response.headers.set('Content-Type', cvData.file_type)
    response.headers.set('Content-Disposition', `attachment; filename="${cvData.original_filename}"`)
    
    return response
  } catch (error) {
    console.error('[CV Download] Error:', error)
    return NextResponse.json(
      { error: 'Failed to download CV file' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cvId = params.id
    const supabase = await createClient()
    
    // Fetch CV metadata first
    const { data: cvData, error: fetchError } = await supabase
      .from('cv_files')
      .select('*')
      .eq('id', cvId)
      .single()

    if (fetchError || !cvData) {
      return NextResponse.json(
        { error: 'CV file not found' },
        { status: 404 }
      )
    }

    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from('portfolio-storage')
      .remove([cvData.storage_path])

    if (storageError) {
      console.warn('[CV Delete] Storage deletion warning:', storageError)
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('cv_files')
      .delete()
      .eq('id', cvId)

    if (deleteError) {
      console.error('[CV Delete] Database error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete CV from database' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'CV file deleted successfully' 
    })
  } catch (error) {
    console.error('[CV Delete] Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete CV file' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { imageId } = await request.json()
    
    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // First deactivate all images
    await supabase
      .from('about_images')
      .update({ is_active: false })
      .neq('id', '00000000-0000-0000-0000-000000000000') // Update all records
    
    // Then activate the selected image
    const { data: imageData, error: dbError } = await supabase
      .from('about_images')
      .update({ is_active: true })
      .eq('id', imageId)
      .select()
      .single()

    if (dbError) {
      console.error('[About Images Activate] Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to activate image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Image activated successfully',
      data: imageData
    })
  } catch (error) {
    console.error('[About Images Activate] Error:', error)
    return NextResponse.json(
      { error: 'Failed to activate image' },
      { status: 500 }
    )
  }
}
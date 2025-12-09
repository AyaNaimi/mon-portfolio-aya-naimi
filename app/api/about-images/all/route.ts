import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Fetch all profile images from database, ordered by upload date
    const { data: images, error } = await supabase
      .from('about_images')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (error) {
      console.error('[About Images API] Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch profile images' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: images || []
    })
  } catch (error) {
    console.error('[About Images API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile images data' },
      { status: 500 }
    )
  }
}
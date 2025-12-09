import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { cvId } = await request.json()
    
    if (!cvId) {
      return NextResponse.json(
        { error: 'CV ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // First, deactivate all CVs
    const { error: deactivateError } = await supabase
      .from('cv_files')
      .update({ is_active: false })
      .neq('id', '')

    if (deactivateError) {
      console.error('[CV Activate] Deactivation error:', deactivateError)
      return NextResponse.json(
        { error: 'Failed to deactivate existing CVs' },
        { status: 500 }
      )
    }

    // Then activate the selected CV
    const { data: activatedCV, error: activateError } = await supabase
      .from('cv_files')
      .update({ is_active: true })
      .eq('id', cvId)
      .select()
      .single()

    if (activateError || !activatedCV) {
      console.error('[CV Activate] Activation error:', activateError)
      return NextResponse.json(
        { error: 'Failed to activate CV' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'CV activated successfully',
      data: activatedCV
    })
  } catch (error) {
    console.error('[CV Activate] Error:', error)
    return NextResponse.json(
      { error: 'Failed to activate CV' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get the currently active CV
    const { data: activeCV, error } = await supabase
      .from('cv_files')
      .select('*')
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('[CV Active] Error:', error)
      return NextResponse.json(
        { error: 'No active CV found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: activeCV
    })
  } catch (error) {
    console.error('[CV Active] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch active CV' },
      { status: 500 }
    )
  }
}
import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; date: string } }
) {
  try {
    const { username, date } = params
    const { searchParams } = new URL(req.url)
    
    // Build query string from search params
    const queryParams = new URLSearchParams()
    
    // Optional filters
    const language = searchParams.get('language')
    const actionType = searchParams.get('actionType')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    
    if (language) queryParams.set('language', language)
    if (actionType) queryParams.set('actionType', actionType)
    if (limit) queryParams.set('limit', limit)
    if (skip) queryParams.set('skip', skip)

    const queryString = queryParams.toString()
    const url = `${API_URL}/api/activities/${username}/${date}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch activities",
        errorCode: "ACTIVITIES_FETCH_ERROR"
      },
      { status: 500 }
    )
  }
}

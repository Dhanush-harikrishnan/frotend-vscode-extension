import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request body
    if (!body.username || !body.dates || !Array.isArray(body.dates)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request: username and dates array are required",
          errorCode: "VALIDATION_ERROR"
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/api/metrics/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching batch metrics:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch batch metrics",
        errorCode: "METRICS_FETCH_ERROR"
      },
      { status: 500 }
    )
  }
}

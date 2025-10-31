import { type NextRequest, NextResponse } from "next/server"
import type { ActivityLog } from "@/lib/types/activity"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/activity`, {
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
    console.error("Error fetching logs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch logs" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ActivityLog = await req.json()

    // Validate required fields
    if (!body.username || !body.fileName || !body.date || !body.actionType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: username, fileName, date, and actionType are required",
          errorCode: "VALIDATION_ERROR"
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/api/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating log:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to create log",
        errorCode: "DATABASE_ERROR"
      },
      { status: 500 }
    )
  }
}

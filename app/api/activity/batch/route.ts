import { type NextRequest, NextResponse } from "next/server"
import type { BatchActivityRequest } from "@/lib/types/activity"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function POST(req: NextRequest) {
  try {
    const body: BatchActivityRequest = await req.json()

    // Validate request body
    if (!body.logs || !Array.isArray(body.logs) || body.logs.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request: logs array is required and must not be empty",
          errorCode: "VALIDATION_ERROR"
        },
        { status: 400 }
      )
    }

    // Validate each log has required fields
    const invalidLogs = body.logs.filter(
      (log) => !log.username || !log.fileName || !log.date || !log.actionType
    )

    if (invalidLogs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `${invalidLogs.length} log(s) missing required fields (username, fileName, date, actionType)`,
          errorCode: "VALIDATION_ERROR"
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/api/activity/batch`, {
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
    console.error("Error creating batch logs:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to create batch logs",
        errorCode: "DATABASE_ERROR"
      },
      { status: 500 }
    )
  }
}

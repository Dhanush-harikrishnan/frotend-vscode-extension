import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string; date: string }> }) {
  try {
    const { username, date } = await params

    const response = await fetch(`${API_URL}/api/summary/${username}/${date}`, {
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
    console.error("Error fetching summary:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch summary" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Session fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
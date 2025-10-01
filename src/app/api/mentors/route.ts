
import { NextResponse } from "next/server";
import { getMentors } from "@/lib/mentor-service";

export async function GET() {
  try {
    const mentors = await getMentors();
    return NextResponse.json(mentors);
  } catch (error) {
    console.error("[MENTORS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

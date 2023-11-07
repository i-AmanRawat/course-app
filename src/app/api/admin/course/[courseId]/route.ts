import connect from "@/db/dbConfig";
import { Course } from "@/models/model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    console.log("hello from backend #get route");
    const courseId = params.courseId;

    const course = await Course.findById(courseId);

    return NextResponse.json({ course });
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const courseId = params.courseId;

    const courseDetails = await request.json();

    const course = await Course.findByIdAndUpdate(courseId, courseDetails, {
      new: true,
    });

    if (course) {
      return NextResponse.json({ message: "Course updated successfully" });
    } else {
      return NextResponse.json({ message: "Course not found" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

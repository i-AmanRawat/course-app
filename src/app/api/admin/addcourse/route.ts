import connect from "@/db/dbConfig";
import { Course } from "@/models/model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const course = await request.json();

    const newCourse = new Course(course);

    await newCourse.save();
    return NextResponse.json({
      message: "Course created successfully",
      courseId: course.id,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

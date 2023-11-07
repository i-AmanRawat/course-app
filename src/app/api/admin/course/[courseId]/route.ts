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
    console.log(courseId);

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
    console.log("hello from backend #put route");

    const courseId = params.courseId;

    const courseDetails = await request.json();

    console.log("courseId : ", courseId);

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

/*
  router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
  });
*/

import { Course } from "@/models/model";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";

connect();

export async function GET() {
  try {
    const courses = await Course.find({});

    return NextResponse.json({ courses });
  } catch (error: any) {
    console.log(error.message);
  }
}

/*
    router.get('/courses', authenticateJwt, async (req, res) => {
        const courses = await Course.find({});
        res.json({ courses });
    });
*/

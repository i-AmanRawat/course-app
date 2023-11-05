import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/model";
import connect from "@/db/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const admin = await Admin.findOne({ username });

    if (admin) {
      return NextResponse.json({
        message: "Admin already exists",
        status: 403,
      });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    const token = jwt.sign(
      { username, role: "admin" },
      process.env.SECRET_KEY!,
      {
        expiresIn: "12h",
      }
    );

    const response = NextResponse.json({
      message: "Admin signedup successfully",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}

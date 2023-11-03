import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/model";
import connect from "@/db/dbConfig";
import { request } from "http";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("before ");
    const { username, password } = await request.json();
    const admin = await Admin.findOne({ username });
    console.log("after");

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

export async function GET(request: NextResponse) {
  try {
    return NextResponse.json({ message: "returning response" });
  } catch (error: any) {
    console.log(error.message);
  }
}

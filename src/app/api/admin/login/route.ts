import jwt from "jsonwebtoken";
import { Admin } from "@/models/model";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const admin = await Admin.findOne({ username });

    if (admin) {
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.SECRET_KEY!,
        { expiresIn: "1d" }
      );

      const response = NextResponse.json({ message: "LoggedIn sucessfully" });

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    }

    return NextResponse.json({
      message: "Invalid username or password",
      status: 403,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

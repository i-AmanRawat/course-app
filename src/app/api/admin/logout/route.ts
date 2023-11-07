import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.json({ message: "Already loggedout" });
    } else {
      const response = NextResponse.json({
        message: "logged out successfully",
      });

      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      return response;
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

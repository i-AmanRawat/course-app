import { Admin } from "@/models/model";
import connect from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Admin doesnt exist" });
    }
    const user = jwt.verify(token!, process.env.SECRET_KEY!) as JwtPayload;

    const admin = await Admin.findOne({ username: user.username });

    if (admin) {
      return NextResponse.json({ username: admin.username });
    } else {
      return NextResponse.json({ message: "Admin doesnt exist" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

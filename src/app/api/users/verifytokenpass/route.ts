import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      forgetPasswordToken: token,
      forgotTokenExpiry: { $gt: Date.now() },
    });
    if (!User) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Password change token verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    console.log(token);

    // Find the user by the forgetPasswordToken
    const user = await User.findOne({
      forgetPasswordToken: token,
      forgotTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password and reset the forgetPasswordToken fields
    user.password = hashedPassword;
    user.forgetPasswordToken = null;
    user.forgotTokenExpiry = null;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

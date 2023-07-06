import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Validator from "validator";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Validate email format
    if (!Validator.isEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "RESET" });

    return NextResponse.json({
      message: "Password verification sent successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType }: any) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Create a hashed token
    const hashedToken = await bcryptjs.hash(user._id.toString(), 10);

    if (emailType === "VERIFY") {
      user.verifyToken = hashedToken;
      user.verifyTokenExpiry = Date.now() + 360000;
    } else if (emailType === "RESET") {
      user.forgetPasswordToken = hashedToken;
      user.forgotTokenExpiry = Date.now() + 360000;
    }

    await user.save();

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    });

    const mailOptions = {
      from: "youarebeautiful@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "verifypassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifypassword?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //hashed opt
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswodToken: hashedToken,
        forgotPasswodTokenExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9011a2d2e01072", //🔥❌
        pass: "********8723", // 🔥❌
      },
    });

    const mailOption = {
      from: "tilaksingh@gmail.com",
      to: email, // list of receivers
      subject:
        emailType === "VARIFY" ? "verify your email" : "Reset your password", // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>
      <a href="${
        process.env.DOMAIN
      }/verifymail?token=${hashedToken}">click here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your email"
      }
      or copy and paste the link below in browser.
      <br>${process.env.DOMAIN}/verifyemail?Token=${hashedToken}</br>
      </p>`, // html body
    };

    const response = await transporter.sendMail(mailOption);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //hashed opt
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswodToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "876031b28db063",
        pass: "10f4295a7bcad1",
      },
    });

    const mailOption = {
      from: "one@gmail.com",
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
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br>
      </p>`, // html body
    };

    const response = await transporter.sendMail(mailOption);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

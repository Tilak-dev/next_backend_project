import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO  configure sendMailer usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "tilaksingh@gmail.com",
      to: email, // list of receivers
      subject:
        emailType === "VARIFY" ? "verify your email" : "Reset your password", // Subject line
      // text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    const response = await transporter.sendMail(mailOption);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/nodeMailer";

//necessary to connect with data base
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //validations
    console.log(reqBody);
    //exist error handling
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { msg: "user already exist" },
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //VERIFY
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    //response
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

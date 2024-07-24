import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//necessary to connect with data base
connect();

export async function GET(request: NextRequest) {
  try {
    const ressponse = NextResponse.json({
      message: "logout in Success",
      success: true,
    });

    ressponse.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return ressponse;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

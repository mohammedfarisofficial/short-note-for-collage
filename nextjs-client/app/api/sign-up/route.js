import User from "@/modals/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Sign Up

export const POST = async (request) => {
  const {
    registerCredential: { email, password, username },
  } = await request.json();

  console.log("Backend credentials", email, password, username);
  try {
    await connect();

    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return new NextResponse("Email already in use", { status: 400 });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    const userCreated = await newUser.save();
    if (userCreated) {
      return new NextResponse("New user Created", { status: 201 });
    }
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};

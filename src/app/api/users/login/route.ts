import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();
 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 401 }
            );
        }

        //creat tokan data
        const tokenData ={
            id: user._id,
            name: user.name,
            email: user.email,
        }

        //create tokan
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string, {
            expiresIn: "7d",
        });

        const response = NextResponse.json(
            { success: true, message: "Login successful" },
            { status: 200 }
        );  
        //set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        
        return response;
        


    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
        
    }
}
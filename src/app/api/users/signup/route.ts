import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB at the start of each request
await connect();


export async function POST(request:NextRequest){
    try { 
        const reqBody= await request.json();
        const {username,email,password}= reqBody;
           
        //check if user already exists
        const user= await User.findOne({email});
        if(user){
            return NextResponse.json({message:"User already exists. Please login."},{status:400});
        }

        //hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        //create new user
        const newUser= new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({message:"User created successfully",sucess:true,savedUser});    

    } catch (error: any) {
        return NextResponse.json({message: error.message},{status:500});
        
    }


}
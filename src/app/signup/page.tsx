"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignupPage(){
    const [user, setUser] = React.useState({
        Username:"",
        email:"",
        password:""
    });

    const onSignup = async()=>{

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            <label htmlFor="userName">Username</label>
            <input
                type="text"
                id="userName"
                value={user.Username}
                onChange={(e) => setUser({ ...user, Username: e.target.value })}
                placeholder="Username"
                className="border p-2 rounded mb-4 border-gray-300 focus:outline-none  focus:border-gray-500"
            />


            <label htmlFor="email">e-mail</label>
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                className="border p-2 rounded mb-4 border-gray-300 focus:outline-none  focus:border-gray-500"
            />



            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="border p-2 rounded mb-4 border-gray-300 focus:outline-none  focus:border-gray-500"
            />

            <button
                onClick={onSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Signup
            </button>

            <p className="mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
        
        </div>
    )
}
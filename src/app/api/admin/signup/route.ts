import connect from "@/connection/mongoDB";
import { Admin } from "@/models/Admin";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const adminExists = await Admin.findOne({
            $or: [{ name }, { email }]
        })

        if (adminExists) {
            return NextResponse.json({ message: "Admin with this name or email already exists" }, { status: 400 });
        }

        await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        return NextResponse.json({ message: "Admin registered" }, { status: 201 })
    } catch (error) {
        console.error("Admin registeration failed", error);
        return NextResponse.json({ message: "Admin registeration failed" }, { status: 500 });
    }
}
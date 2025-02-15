import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connect from "@/connection/mongoDB";
import { Admin } from "@/models/Admin";

export async function GET(request: NextRequest) {
    try {
        await connect();

        const token = request.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

        const admin = await Admin.findOne({ email: decoded.email }).select("-password -refreshToken");
        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }

        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }
}

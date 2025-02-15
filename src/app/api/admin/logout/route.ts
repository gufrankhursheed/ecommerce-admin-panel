import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connect from "@/connection/mongoDB";
import { Admin } from "@/models/Admin";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const accessToken = request.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        } catch (error) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
        }

        const email = decodedToken.email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }

        admin.refreshToken = "";
        await admin.save();

        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.set("accessToken", "", { httpOnly: true, secure: true, expires: new Date(0) });

        return response;
    } catch (error) {
        console.error("Logout failed", error);
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}

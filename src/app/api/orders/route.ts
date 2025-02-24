import connect from "@/connection/mongoDB";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();
        const orders = await Order.find({});
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Could not fetch orders" }, { status: 500 });
    }
}
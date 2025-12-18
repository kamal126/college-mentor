import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
    
        const users = await User.find();
        return Response.json(users);

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


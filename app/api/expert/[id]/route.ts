import connectDB from "@/lib/connectDB";
import { Mentor } from "@/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

type RouteContext = {
  params: Promise<{id : string}>
};

export async function GET(
    _request: Request,
    context: RouteContext
) {
    try {
        await connectDB();

        const { id } =  await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid ID" },
                { status: 400 }
            );
        }

        const mentor = await Mentor.findById(id)
            .select("fullName")
            .lean();

        if (!mentor) {
            return NextResponse.json(
                { error: "Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            name: mentor.fullName
        });

    } catch (error) {
        console.error("Mentor fetch error:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

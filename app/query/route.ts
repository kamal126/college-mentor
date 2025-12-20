import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";

connectDB();
async function mentors() {
    const mentors = await Mentor.find();

    return mentors;
}

export async function GET() {
  try {

    return Response.json(await mentors());
  } catch (error) {
    return Response.json({ error: "seed failed" }, { status: 500 });
  }
}
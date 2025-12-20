import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";

async function mentors() {
    await connectDB(); // 👈 yahin hona chahiye
    return Mentor.find();
}

export async function GET() {
  try {
    const data = await mentors();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}

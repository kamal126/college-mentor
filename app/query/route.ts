import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";

async function mentors() {
    await connectDB(); // 👈 yahin hona chahiye
    return Mentor.find();
}
async function users() {
    await connectDB(); // 👈 yahin hona chahiye
    return User.find();
}

export async function GET() {
  try {
    // const data = await mentors();
    const data1 = await users();
    const data2 = await mentors();
    return Response.json({data1, data2});
  } catch (error) {
    console.error(error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}

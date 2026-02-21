import { mentors } from "@/data/data";
import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";

async function seedMentors() {
  // 🔒 Prevent seeding in production
  if (process.env.NODE_ENV === "production") {
    throw new Error("Seeding disabled in production");
  }

  await connectDB();
  const res = [];

  for (const mentor of mentors) {
    let user = await User.findOne({ fullName: mentor.fullName });
    // if (!user) continue;
    if (!user) {
      user = await User.create({
        username: mentor.fullName + "123",
        fullName: mentor.fullName,
        email: `${mentor.fullName.replace(" ", "").toLowerCase()}@demo.com`,
        password: "123456",
      });
    }

    const existingMentor = await Mentor.findOne({ user: user._id });
    if (existingMentor) continue;

    const newMentor = await Mentor.create({
      user: user._id,
      fullName: mentor.fullName,
      title: mentor.title,
      company: mentor.company,
      companies: mentor.companies,
      experience: mentor.experience,
      bio: mentor.bio,
      rating: mentor.rating,
      price: mentor.price,
      skills: mentor.skills,
      avatar: mentor.avatar,
      isActive: mentor.active,
    });

    res.push(newMentor);
  }

  return res;
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Seeding not allowed in production" },
      { status: 403 },
    );
  }

  try {
    const mentors = await seedMentors();

    return Response.json({
      status: 200,
      success: true,
      count: mentors.length,
      mentors,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "seed failed" }, { status: 500 });
  }
}

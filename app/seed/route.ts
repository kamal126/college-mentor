import { mentors, authors, trending } from "@/data/data";
import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";

// async function listUser() {
//     const data = mentors.filter((m) => m.active  === true);

//     return data;
// }

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
        username: mentor.fullName+'_demo',
        fullName: mentor.fullName,
        email: `${mentor.fullName.replace(" ", "").toLowerCase()}@demo.com`,
        password:"123456"
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


// async function tempUser() {
//   const data = await User.find();

//   return data;
// }

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Seeding not allowed in production" },
      { status: 403 }
    );
  }
  //   return Response.json({
  //     message:
  //       'Uncomment this file and remove this line. You can delete this file when you are finished.',
  //   });
  try {
    const mentors = await seedMentors();

    return Response.json({
      status:200,
      success:true,
      count: mentors.length,
      mentors,
    });
  } catch (error) {
    return Response.json({ error: "seed failed" }, { status: 500 });
  }
}

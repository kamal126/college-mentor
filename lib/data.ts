import { User, Mentor } from "@/models/user.model";
import connectDB from "@/lib/connectDB";
// import { mentors } from "@/data/data";


export async function fetchUsers() {
  await connectDB();
  try {

    const users = await User.find({})
      .select("-password")
      .sort({ username: 1 })
      .lean();

    return users; // can be []
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchFilteredMentors(query: string, page: number) {
  await connectDB();

  const ITEMS_PER_PAGE = 10;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const mentors = await Mentor.find({
    fullName: { $regex: query, $options: "i" }, // case-insensitive search
  })
    .sort({ fullName: 1 })
    .skip(skip)
    .limit(ITEMS_PER_PAGE)
    .lean();

  return mentors;
}

export async function fetchUserById(userId: string) {
  await connectDB();

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  return user;
}

export async function fetchMentorById(mentorId: string) {
  await connectDB();

  let mentor = null;
  mentor = await Mentor.findOne({user: mentorId})

  if(!mentor){
    mentor = await Mentor.findById(mentorId);
  }

  if (!mentor) throw new Error("Mentor not found");

  return mentor;
}


export async function fetchTopMentor() {
  await connectDB();
  const topMentors = await Mentor
    .find({})
    .sort({ rating: -1 })
    .limit(5)
    .lean();

  return topMentors;
}

export async function fetchFilteredMentorsCount(query: string) {
  await connectDB();

  const count = await Mentor.countDocuments({
    fullName: {$regex: query, $options: "i"},
  });

  return count;
}

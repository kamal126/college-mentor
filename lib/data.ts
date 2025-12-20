import { User } from "@/models/user.model";
import connectDB from "@/lib/connectDB";
// import { mentors } from "@/data/data";
import { Mentor } from "@/models/user.model";


export async function fetchUsers() {
  try {
    await connectDB();

    const users = await User.find({})
      .select("_id username fullName")
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

  const user = await User.findById(userId)
    .select("_id fullName company experience price bio companies")
    .lean();

  if (!user) throw new Error("User not found");

  return {
    _id: user._id.toString(),
    name: user.fullName,
    company: "",
    companies: [],
    experience: 0,
    price: 0,
    bio: "",
    active: true,
  };
}


export async function fetchTopMentor() {
  const topMentors = await Mentor
    .find({})
    .sort({ rating: -1 })
    .limit(5)
    .lean();

  return topMentors;
}


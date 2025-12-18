import { User } from "@/models/user.model";
import connectDB from "@/lib/connectDB";
import { mentors } from "@/data/data";

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
  const ITEMS_PER_PAGE = 10;

  const filtered = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(query.toLowerCase())
  );

  return filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
}

export async function fetchUserById(userId: string) {
  await connectDB();

  const user = await User.findById(userId)
    .select("_id name company experience price bio companies")
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

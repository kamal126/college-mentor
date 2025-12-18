import { mentors, authors, trending } from "@/data/data";
import { User } from "@/models/user.model";

async function listUser() {
    const data = mentors.filter((m) => m.active  === true);

    return data;
}

async function tempUser() {
  const data = await User.find();

  return data;
}

export async function GET() {
//   return Response.json({
//     message:
//       'Uncomment this file and remove this line. You can delete this file when you are finished.',
//   });
  try {
  	return Response.json(await tempUser());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}



import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/connectDB";
import { User } from "../../../models/user.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if(req.method === "GET") {
    const user = await User.findById(id);
    return res.status(200).json(user);
  }

  if(req.method === "PUT") {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedUser);
  }

  res.status(405).json({ message: "Method not allowed" });
}

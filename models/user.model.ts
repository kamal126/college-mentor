import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  password: string;
}

export interface IExpert {
  user: mongoose.Types.ObjectId;
  fullName: string;
  title: string;
  company: string;
  companies: string[];
  experience: number;
  bio: string;
  rating: number;
  price: number;
  skills: string[];
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    avatar: { type: String, default: "/assets/logo.png" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const expertSchema = new Schema<IExpert>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    fullName: { type: String, required: true },
    title: { type: String, required: true, lowercase: true },
    company: { type: String, required: true, lowercase: true },

    companies: {
      type: [String],
      required: true,
    },

    experience: { type: Number, required: true, default: 0 },
    bio: { type: String, required: true },

    rating: { type: Number, default: 0 },
    price: { type: Number, default: 0 },

    skills: {
      type: [String],
      required: true,
    },

    avatar: { type: String, default: "/assets/logo.png" },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const Mentor: Model<IExpert> =
  mongoose.models.Mentor || mongoose.model<IExpert>("Mentor", expertSchema);

export { User, Mentor };

import mongoose, { Schema, Types, Model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  password: string;
  forgetPasswordToken: string;
  forgetPasswordTokenExpiry:Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

export interface IExpert {
  user: Types.ObjectId;

  fullName: string;
  title: string;
  company: string;
  companies: string[];

  experience: number; // years
  bio: string;

  rating: number; // 0 - 5
  price: number; // per session

  skills: string[];
  avatar: string;

  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    avatar: { type: String, default: "/assets/logo.png" },
    password: { type: String, required: true },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

  },
  { timestamps: true }
);

const expertSchema = new Schema<IExpert>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: { type: String, required: true, trim: true },

    title: { type: String, required: true, trim: true },

    company: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    companies: {
      type: [String],
      validate: [(v: string[]) => v.length > 0, "Companies required"],
    },

    experience: { type: Number, min: 0, default: 0 },

    bio: { type: String, required: true },

    rating: { type: Number, min: 0, max: 5, default: 0 },

    price: { type: Number, min: 0, default: 0 },

    skills: {
      type: [String],
      required: true,
      validate: [(v: string[]) => v.length > 0, "Skills required"],
      index: true,
    },

    avatar: { type: String, default: "/assets/logo.png" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const Mentor: Model<IExpert> =
  mongoose.models.Mentor || mongoose.model<IExpert>("Mentor", expertSchema);

export { User, Mentor };

import mongoose, { Schema, Types, Model } from "mongoose";

/* ============================= */
/* 🔹 Interfaces                 */
/* ============================= */

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  password: string;
  isMentor: boolean;
  refershToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExpert {
  _id?: string;
  user: Types.ObjectId | string;
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
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/* ============================= */
/* 🔹 Helper: Global Transform   */
/* ============================= */

const transform = (_: any, ret: any) => {
  ret._id = ret._id?.toString();

  if (ret.user) {
    ret.user = ret.user.toString();
  }

  delete ret.__v;
  return ret;
};

/* ============================= */
/* 👤 User Schema                */
/* ============================= */

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: { type: String, required: true, trim: true },
    avatar: { type: String },
    password: { type: String, required: true },
    isMentor: { type: Boolean, default: false },
    refershToken: { type: String },
  },
  {
    timestamps: true,
    toJSON: { transform },
    toObject: { transform },
  }
);

/* ============================= */
/* 🧠 Mentor Schema              */
/* ============================= */

const expertSchema = new Schema<IExpert>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
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
  {
    timestamps: true,
    toJSON: { transform },
    toObject: { transform },
  }
);

/* ============================= */
/* 🔹 Models                     */
/* ============================= */

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const Mentor: Model<IExpert> =
  mongoose.models.Mentor || mongoose.model<IExpert>("Mentor", expertSchema);

export { User, Mentor };

import mongoose, { Schema, Document, model } from "mongoose";



export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  avatar: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
}, { timestamps: true });

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Password comparison
// userSchema.methods.isPasswordCorrect = async function(password: string){
//   return await bcrypt.compare(password, this.password);
// }

// Generate JWT tokens
// userSchema.methods.generateAccessToken = function(){
//   return jwt.sign({ _id: this._id, email: this.email, username: this.username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
// }

// userSchema.methods.generateRefreshToken = function(){
//   return jwt.sign({ _id: this._id, email: this.email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
// }

export const User = mongoose.models.User || model<IUser>("User", userSchema);

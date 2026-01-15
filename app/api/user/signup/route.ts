import { uploadOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import fs, { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

await connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, fullName,email,password,avatar} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User already exists"}, {status:400});
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        // image upload on cloudinary
        let avatarUrl = "";

        if(avatar && avatar.size>0){
            // server side validation image formate
            if(!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)){
                return NextResponse.json({message: "Invalid image format."});
            }
            // not grater than 2MB
            if(avatar.size>2*1024*1024){
                return NextResponse.json({message: `Avatar too large ${avatar.size} accepable (max 2MB)`});
            }

            // convert file buffer
            const bytes = await avatar.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // crete tmp path
            const ext = avatar.name.split('.').pop();
            const fileName = `${Date.now()}.${ext}`;
            const tempDir = path.join(process.cwd(), "public","temp");
            await fs.mkdir(tempDir, {recursive: true});
            const localFilePath = path.join(tempDir, fileName);

            // write temp file
            await writeFile(localFilePath, buffer);
            // upload to clodinary
            const uploaded = await uploadOnCloudinary(localFilePath);

            if(!uploaded){
                return NextResponse.json({message:"Avatar upload failed"});
            }
            // assign clodinry url
            avatarUrl = uploaded.url;
        }

        const newuser = new User({
            username,
            fullName,
            avatar,
            email,
            password: hashPassword
        });

        const savedUser = await newuser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User created Sucessfully",
            success: true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}
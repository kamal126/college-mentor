import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadOnCloudinary(localFilePath: string) {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    await fs.unlink(localFilePath);

    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    try {
      await fs.unlink(localFilePath);
    } catch {}

    console.error("Cloudinary upload error:", error);
    return null;
  }
}

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Uploads an image directly from a buffer to Cloudinary.
 * @param buffer The file buffer
 * @param filename Optional filename for Cloudinary public_id
 * @returns { url, publicId } or null if failed
 */
export async function uploadOnCloudinary(buffer: Buffer, filename?: string) {
  return new Promise<{ url: string; publicId: string } | null>((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "avatars",
        resource_type: "auto",
        public_id: filename ? filename.replace(/\.[^/.]+$/, "") : undefined,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          resolve(null);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          resolve(null);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

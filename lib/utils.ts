import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs));
}

// ============================================
export async function uploadOnCloudinary (localFilePath:string) {
    try {
        if(!localFilePath) return null;

        const path = localFilePath.replace(/\\/g,"/");

        const response = await cloudinary.uploader.upload(path,{
            resource_type: "auto",
        });
        console.log("File uploaded successfully: ", response.url);

        fs.unlink(path, (err)=>{
            if(err) console.error("Failed to delete temp file: ", err);
        });
        
        return response;
        
    } catch (error) {
        console.log("Cloudinary upload error:",error);

        fs.unlink(localFilePath, (err)=>{
            if(err) console.error("Failed to delete temp file:",err);
        });

        return null;
    }
}
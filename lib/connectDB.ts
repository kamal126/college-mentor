'use server';

import mongoose, { Mongoose } from "mongoose";


if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
  throw new Error("DATABASE_URL or DATABASE_NAME missing");
}

const MONGODB_URI = `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`;


if(!MONGODB_URI){
    throw new Error("Please define DATABASE_URI and DATABASE_NAME in .env");
}

// Global cache (prevents multiple connections in dev & production)

declare global {
    // eslint-disable-next-line no-var
    var mongoose : {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise:null};
}

const connectDB = async () : Promise<Mongoose> => {
    if( cached.conn ) return cached.conn;

    // create onnection once
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{bufferCommands: false});
    }

    cached.conn = await cached.promise;
    console.log("MongoDB connected");

    return cached.conn;
};

export default connectDB;
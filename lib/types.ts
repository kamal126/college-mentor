import mongoose from "mongoose";

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};


export interface Mentor {
  fullName: string;
  title:string;
  company: string;
  companies: string[];
  experience: number;
  price: number;
  bio: string;
  active?: boolean;
  rating?: number;
  skills?: string[];
  avatar?: string;
}


export type Author = {
  name: string;
  img: string;
  role: string;
  online: boolean;
}

export type expert = {
  username: string;
  role: string;
  company: string;
  experience: number;
  price: number;
  bio: string;
  pastCompanies: string;
};

export type Conversation = {
  _id?: mongoose.Types.ObjectId;
  image?: string;
  participants: mongoose.Types.ObjectId;
  isGroup: boolean;
  name?: string;
  groupName?: string;
  groupImage?: string;
  admin?: mongoose.Types.ObjectId;
  isOnline?: boolean;
  lastMessage?: {
    _id: mongoose.Types.ObjectId;
    conversation: mongoose.Types.ObjectId;
    content: string;
    sender: mongoose.Types.ObjectId;
  }
}

export type ConversationStore = {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void
}

export interface IMessage {
  _id: string;
  content: string;
  _creationTime: number;
  messageType: "text" | "image" | "video";
  sender: {
    _id : mongoose.Types.ObjectId;
    image: string;
    name?: string;
    tokenIdentifier: string;
    email: string;
    _creationTime: number;
    isOnline: boolean;
  }
}
import mongoose, {Schema, Models, Types, Model} from "mongoose";

export interface IMessage{
    _id?:string;
    sender: Types.ObjectId | string;    // User or Mentor
    text: string;
    createdAt?: Date;
}
export interface IChat{
    _id?:string;
    participants:Types.ObjectId[]; // 2 participant: [mentorId, userId]
    messages: IMessage[];
    createdAt?: Date;
    updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    text:{
        type:String, required:true,
    }
}, {timestamps:true});

const chatSchema = new Schema<IChat>({
    participants:{
        type:[Schema.Types.ObjectId],
        ref: "Users",
        require:true,
    },
    messages:[messageSchema],

}, {timestamps:true});

chatSchema.index(
    {participants:1},
    {unique:true}
);

const Chat:Model<IChat> = mongoose.models.Chat || mongoose.model<IChat>("Chat", chatSchema);

export default Chat;





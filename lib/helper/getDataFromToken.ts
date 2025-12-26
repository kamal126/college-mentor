import { auth } from "@/auth"
import { redirect } from "next/navigation";

export const getDataFromToken = async ()=>{
    const session = await auth();

    if(!session) redirect('/signin');

    return session.user;
}
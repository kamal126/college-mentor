"use client";

import { toast } from "sonner";

export default function Toast({msg, text}:{
  msg: string;
  text?:string;
}) 
{
  return (
    <button onClick={() => toast.success(msg)}>
      {text}
    </button>
  );
}

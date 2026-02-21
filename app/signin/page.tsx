import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { authOptions } from "@/auth";

export default async function SignInPage() {
  // Server-side session check
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect authenticated users to dashboard
    redirect("/dashboard");
  }

  // Render the login form for unauthenticated users
  return <LoginForm />;
}
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";
import { authOptions } from "@/auth";


export default async function SignupPage() {
  // Server-side session check
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect logged-in users to dashboard
    redirect("/dashboard");
  }

  // Render client-side signup form for unauthenticated users
  return <SignupForm />;
}
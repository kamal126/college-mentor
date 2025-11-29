"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft, Shield, Star, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // stop full page reload

    // If inputs are valid → navigate
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center bg-[#F5F8FF] px-8">
      {/* Back Button */}
      <div className="absolute top-6 left-6 flex items-center space-x-1">
        <ArrowLeft size={16} />
        <Link href="/" className="text-sm font-medium">
          Back to Home
        </Link>
      </div>

      {/* Left Section */}
      <div className="w-1/2 space-y-6 pl-10">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white p-3 rounded-xl">⭐</div>
          <h2 className="text-xl font-semibold">AI College Mentor</h2>
        </div>

        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-600 max-w-md">
          Continue your learning journey with personalized AI guidance.
        </p>

        <div className="space-y-4 pt-4">
          <Feature
            icon={<Star />}
            title="AI-Powered Guidance"
            description="Get instant answers 24/7"
          />
          <Feature
            icon={<List />}
            title="Personalized Resources"
            description="Tailored to your profile"
          />
          <Feature
            icon={<Shield />}
            title="Secure & Private"
            description="Your data is encrypted"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center">
        <Card className="w-[420px] shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4 p-8">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="kamal@example.com"
                className="pl-9"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="********"
                className="pl-9"
                minLength={6}
                maxLength={16}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>

          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-500">
              Or continue with
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <img
                src="https://www.google.com/favicon.ico"
                width="18"
                height="18"
                alt=""
              />
              Sign in with Google
            </Button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link href="/sign-up" className="text-blue-600 font-medium">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

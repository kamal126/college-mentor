"use client";
import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion as m } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Brain,
  Zap,
  Clock,
  ArrowUpLeft,
  ArrowUpRight,
  BotIcon,
  Laptop,
  Bot,
  BotMessageSquare,
  ChartColumn,
  PlaneTakeoff,
} from "lucide-react";

import { features, collab } from "@/data/data";
import { cn } from "@/lib/utils";

const instrumentserif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Chat wala section */}
      <section className="relative w-full py-24 min-h-dvh flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 lg:w-2/3 h-72 bg-primary/20 rounded-full blur-[300px]"></div>
        <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-6 pt-8 md:pt-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1
              className={cn(
                "text-4xl md:text-6xl font-bold text-glow text-focus"
              )}
            >
              AI-Powered Career
              <span className="px-2 md:px-4 relative">
                <Image
                  src="/assets/line.svg"
                  alt="dot"
                  height={100}
                  width={100}
                  priority
                  className="absolute -bottom-1 left-3 z-10 w-11/12 -rotate-5"
                />
                <p className="inline relative z-20">Guidance</p>
              </span>
              <Sparkles
                className="size-12 animate-pulse md:inline hidden"
                strokeWidth={1.1}
                fillOpacity={1}
                fill="#E1B10D"
                stroke="#E1B10D"
              />
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-4xl mt-2">
              Get instant, contextual guidance for academics and placements.
              Navigate your college journey with confidence using AI-powered
              insights tailored just for you.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link href={"/dashboard"}>
              <Button
                size={"lg"}
                className="rounded-full px-8 gap-2 text-lg group glow cursor-pointer"
              >
                Get Start
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="hidden relative w-full sm:block max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl border border-border/50 bigshadow"
          >
            <div className="aspect-video flex items-center justify-center">
              <div className="w-full max-w-4xl dark:bg-gray-900 flex flex-col h-full p-6">
                <div className="flex gap-2 mb-4 items-center">
                  <div className="rounded-full bg-destructive w-3 h-3"></div>
                  <div className="rounded-full bg-yellow-500 w-3 h-3"></div>
                  <div className="rounded-full bg-green-500 w-3 h-3"></div>
                  <div className="flex-1"></div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="h-8 w-3/4 bg-primary/10 rounded-md"></div>
                  <div className="flex flex-1 gap-4">
                    <div className="w-2/3 bg-primary/5 rounded-md p-4 flex flex-col gap-2">
                      {Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={`mocktext-${i}`}
                            className={`h-4 ${
                              i === 0
                                ? "h-6 w-3/4"
                                : i === 4
                                ? "w-full"
                                : i === 5
                                ? "w-4/5"
                                : i === 3
                                ? "w-5/6"
                                : "w-full"
                            } bg-primary/10 rounded-md`}
                          ></div>
                        ))}
                    </div>
                    <Image
                      src={"/assets/Research.svg"}
                      alt=""
                      width={400}
                      height={100}
                      loading="lazy"
                      className="h-auto lg:w-96 md:80 w-52"
                    />
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>

        <Image
          src={"/assets/dots.svg"}
          alt=""
          height={200}
          width={200}
          loading="lazy"
          className="absolute top-40 -left-20 opacity-60 hidden md:block"
        />
        <Image
          src={"/assets/dots.svg"}
          alt=""
          height={200}
          width={200}
          loading="lazy"
          className="absolute bottom-80 -right-20 opacity-60 hidden md:block"
        />
      </section>

      {/* Features wala section */}
      <section className="w-full py-32 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={cn(
                instrumentserif.className,
                "text-3xl md:text-6xl font-bold mb-4"
              )}
            >
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools and features designed to support your academic
              journey and career aspirations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
                <Card key={idx} className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400/50 -z-10 group-hover:translate-x-10 group-hover:translate-y-10 duration-500 blur-3xl"/>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="w-6 h-6 text-primary"/>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>
                      {feature.descption}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.content}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-32 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={cn(
                instrumentserif.className,
                "text-3xl md:text-6xl font-bold mb-4"
              )}
            >
              Built by a Collaborative Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              January 2024 – April 2025 | React, Node.js, MongoDB, Gemini LLM API
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {collab.map((c, idx) => (
                <Card key={idx} className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400/50 -z-10 group-hover:translate-x-10 group-hover:translate-y-10 duration-500 blur-3xl"/>
                  <CardHeader className="pb-2">
                    <div className="relative w-12 h-12">
                    <div className=" absolute left-25 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <c.icon className="w-6 h-6 text-primary"/>
                    </div></div>
                    <CardTitle className="text-xl mt-5">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{c.content}</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Freemium Page */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 lg:w-2/3 h-t2 bg-primary/20 rounded-full blur-[300px]"></div>
        <div className="container max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <h2 className={cn("text-3xl md:text-6xl font-bold mb-6 max-w-3xl")}>
            Ready to Transform Your College Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Join thousands of students already using AI College Mentor to
            achieve their academic and career goals
          </p>
          <Link href={"/sign-in"}>
            <Button className="rounded-full px-8 py-6 text-lg gap-2 group glow">
              Start Freemium
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* footer */}
      <section className="w-full p-5">
        <div className="max-w-4xl mx-auto text-center h-10">
          <p className="text-gray-400 dark:text-white">
            © 2024-2025 AI College Mentor. Built with React, Node.js, and Gemini
            LLM API
          </p>
          <p className="text-gray-400 dark:text-white">
            Your data is secure and never shared
          </p>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Breadcrumbs from "@/components/expert/breadcrumbs";
import { ArrowUpRight, AwardIcon, BookOpenTextIcon, RadarIcon, TargetIcon, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if(!session){
    redirect('/test');
  }
  return (
    <main>
      <Breadcrumbs breadcrumbs={[{ label: "Home", href: "/dashboard", active:true }]} />
      <div className="p-6 md:p-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div style={{ opacity: 1, transform: "none" }}>
            <h1 className="text-slate-900 mb-2">Welcome back, {session.user.name}</h1>
            {/* <p className="text-slate-600">
              Computer Science • 3rd Year • Sample University
            </p> */}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">

            <div style={{opacity: 1, transform: 'none'}}>
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpenTextIcon className="w-5 h-5 text-blue-600"/>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-600"/>
                </div>
                <p className="text-slate-900 mb-1">47</p>
                <p className="text-sm text-slate-600 mb-1">Questions Asked</p>
                <p className="text-xs text-slate-500">+12 this week</p>
              </div>
            </div>

            <div style={{opacity: 1, transform: 'none'}}>
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TargetIcon className="w-5 h-5 text-green-600"/>
                  </div>
                    <ArrowUpRight className="w-4 h-4 text-green-600"/>
                </div>
                <p className="text-slate-900 mb-1">15 days</p>
                <p className="text-sm text-slate-600 mb-1">Learning Streak</p>
                <p className="text-xs text-slate-500">Keep it up!</p>
              </div>
            </div>
            
            <div style={{opacity: 1, transform: 'none'}}>
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <AwardIcon className="w-5 h-5 text-violet-600"/>
                  </div>
                    <ArrowUpRight className="w-4 h-4 text-green-600"/>
                </div>
                <p className="text-slate-900 mb-1">23</p>
                <p className="text-sm text-slate-600 mb-1">Resources Saved</p>
                <p className="text-xs text-slate-500">+5 new</p>
              </div>
            </div>
            
            <div style={{opacity: 1, transform: 'none'}}>
              <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-600"/>
                  </div>
                    <ArrowUpRight className="w-4 h-4 text-green-600"/>
                </div>
                <p className="text-slate-900 mb-1">68%</p>
                <p className="text-sm text-slate-600 mb-1">Progress</p>
                <p className="text-xs text-slate-500">on track</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}

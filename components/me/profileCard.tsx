'use client';

import { IExpert, IUser } from "@/models/user.model";
export default function ProfileCard({
  me,
  expert,
}: {
  me: IUser;
  expert: IExpert;
}) {

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* ===== USER HERO ===== */}
      <div className="relative bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <button>Edit</button>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={me.avatar}
            alt={me.fullName}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{me.fullName}</h1>
            <p className="opacity-90">@{me.username}</p>
            <p className="mt-2 text-sm opacity-90">{me.email}</p>

            {me.isMentor && (
              <span className="inline-block mt-3 px-4 py-1 text-sm bg-white/20 rounded-full">
                Expert
              </span>
            )}
          </div>

          {expert?.createdAt && (
            <div className="text-center sm:text-left">
              <p className="opacity-90">
                Joined: {new Date(expert.createdAt).toDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===== EXPERT SECTION ===== */}
      {expert && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold uppercase">
                {expert.title}
              </h2>
              <p className="text-gray-600">
                {expert.company} • {expert.experience}+ years experience
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-indigo-600">
                ₹{expert.price}
              </p>
              <p className="text-sm text-gray-500">per session</p>
            </div>
          </div>

          <q className="text-gray-500 leading-relaxed">{expert.bio}</q>

          {expert.skills?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {expert.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {expert.companies?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Previously Worked At</h3>
              <div className="flex flex-wrap gap-3">
                {expert.companies.map((company: string) => (
                  <span
                    key={company}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
            {expert.rating && (
              <p className="text-sm">
                ⭐ <strong>{expert.rating}</strong> rating
              </p>
            )}

            {expert.isActive && (
              <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                You are joined as expert
              </span>
            )}
          </div>
        </div>
      )}

      {!expert && (
        <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-600">
          <p>You are not an expert yet.</p>
          <p className="text-sm mt-1">
            Complete your expert profile to start experting 🚀
          </p>
        </div>
      )}
    </div>
  );
}

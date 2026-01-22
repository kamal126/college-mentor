
import { fetchMentorById, fetchUserById } from "@/lib/data";
import { redirect } from "next/navigation";
// import ProfileCard from "./profileCard";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await fetchUserById(session.user.id);

  let mentor = null;
  if (user.isMentor) {
    mentor = await fetchMentorById(user._id.toString());
  }

  // return <ProfileCard me={user} mentor={mentor} />;
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* ===== USER HERO ===== */}
      <div className="relative bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <button>Edit</button>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="opacity-90">@{user.username}</p>
            <p className="mt-2 text-sm opacity-90">{user.email}</p>

            {user.isMentor && (
              <span className="inline-block mt-3 px-4 py-1 text-sm bg-white/20 rounded-full">
                mentor
              </span>
            )}
          </div>

          {mentor?.createdAt && (
            <div className="text-center sm:text-left">
              <p className="opacity-90">
                Joined: {new Date(mentor.createdAt).toDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===== mentor SECTION ===== */}
      {mentor && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold uppercase">
                {mentor.title}
              </h2>
              <p className="text-gray-600">
                {mentor.company} • {mentor.experience}+ years experience
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-indigo-600">
                ₹{mentor.price}
              </p>
              <p className="text-sm text-gray-500">per session</p>
            </div>
          </div>

          <q className="text-gray-500 leading-relaxed">{mentor.bio}</q>

          {mentor.skills?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill: string) => (
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

          {mentor.companies?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Previously Worked At</h3>
              <div className="flex flex-wrap gap-3">
                {mentor.companies.map((company: string) => (
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
            {mentor.rating && (
              <p className="text-sm">
                ⭐ <strong>{mentor.rating}</strong> rating
              </p>
            )}

            {mentor.isActive && (
              <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                You are joined as mentor
              </span>
            )}
          </div>
        </div>
      )}

      {!mentor && (
        <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-600">
          <p>You are not an mentor yet.</p>
          <p className="text-sm mt-1">
            Complete your mentor profile to start mentoring 🚀
          </p>
        </div>
      )}
    </div>
  );
}

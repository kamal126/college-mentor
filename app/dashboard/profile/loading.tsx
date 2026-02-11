import Image from "next/image";

export default function Loading() {
  return (
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
  
        {/* ================= USER HERO ================= */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <button className="absolute top-4 right-4 px-4 py-1 text-sm bg-white/20 rounded-lg">
          </button>
  
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src={"/public/assets/logo.png"}
              alt={"user image"}
              width={112}
              height={112}
              className="rounded-full border-4 border-white object-cover"
            />
  
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold"></h1>
              <p className="opacity-90"></p>
              <p className="mt-2 text-sm opacity-90"></p>
            </div>

          </div>
        </div>
  
        {/* ================= MENTOR SECTION ================= */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold uppercase">
                </h2>
                <p className="text-gray-600">
                </p>
              </div>
  
              <div className="text-right">
                <p className="text-xl font-bold text-indigo-600">
                </p>
                <p className="text-sm text-gray-500"></p>
              </div>
            </div>
  
            <q className="text-gray-600 leading-relaxed">
            </q>
              <div>
                <h3 className="font-semibold mb-2"></h3>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"></span>
                </div>
              </div>
            
  
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
                <p className="text-sm">
                  ⭐ <strong></strong>
                </p>
  
            </div>
          </div>
      </div>
    );
}

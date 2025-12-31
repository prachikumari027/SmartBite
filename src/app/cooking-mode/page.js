"use client";

import { useRouter } from "next/navigation";
import { Clock, CheckCircle, CookingPot } from "lucide-react";

const CookingHistoryPage = () => {
  const router = useRouter();

  const cookingList = [
    {
      id: "101",
      title: "Paneer Butter Masala",
      status: "queue",
      time: "30 mins",
      scheduled: "12 Sep 2025",
    },
    {
      id: "102",
      title: "Veg Biryani",
      status: "queue",
      time: "45 mins",
      scheduled: "10 Sep 2025",
    },
    {
      id: "201",
      title: "Dal Tadka",
      status: "completed",
      scheduled: "Today Evening",
    },
    {
      id: "202",
      title: "Aloo Paratha",
      status: "completed",
      scheduled: "Tomorrow Morning",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-pink-400 mb-8">
        🍳 Cooking Activity
      </h1>

      {/* Cooking Rows */}
      <div className="space-y-4">
        {cookingList.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/cooking-mode/${item.id}`)}
            className="bg-zinc-900 border border-pink-500/20 rounded-xl p-5 cursor-pointer
                       hover:border-pink-400 hover:scale-[1.01] transition flex flex-col md:flex-row
                       md:items-center md:justify-between gap-4"
          >
            {/* Left */}
            <div>
              <h3 className="text-lg font-semibold text-pink-300">
                {item.title}
              </h3>

              {item.status === "completed" ? (
                <p className="text-sm text-gray-400 mt-1">
                  ⏱ {item.time} • Cooked on {item.date}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-1">
                  ⏳ Scheduled: {item.scheduled}
                </p>
              )}
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-2">
              {item.status === "completed" ? (
                <>
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-sm text-green-400 font-medium">
                    Completed
                  </span>
                </>
              ) : (
                <>
                  <CookingPot className="text-pink-400" size={20} />
                  <span className="text-sm text-pink-400 font-medium">
                    In Queue
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookingHistoryPage;

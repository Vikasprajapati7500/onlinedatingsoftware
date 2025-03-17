"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(true);

  const destinationOptions = [
    { name: "Atkins Diet" },
    { name: "Low Fat Diet" },
    { name: "Low Carb Diet" },
    { name: "Keto Diet" },
    { name: "Mediterranean Diet" },
    { name: "Paleo Diet" },
    { name: "Vegetarian Diet" },
    { name: "High Protein Diet" },
    { name: "Gluten Free Diet" },
    { name: "Dairy Free Diet" },
    { name: "Vegan Diet" },
    { name: "Raw Food Diet" },
    { name: "DASH Diet" },
    { name: "Flexitarian Diet" },
    { name: "South Beach Diet" },
    { name: "Weight Watchers (WW) Diet" },
    { name: "Zone Diet" },
    { name: "Ornish Diet" },
    { name: "Jenny Craig Diet" },
    { name: "Whole30 Diet" },
    { name: "Intermittent Fasting" },
    { name: "Pescatarian Diet" },
    { name: "Macrobiotic Diet" },
    { name: "Anti-Inflammatory Diet" },
    { name: "Low Glycemic Index Diet" },
    { name: "Military Diet" },
    { name: "Volumetrics Diet" },
    { name: "Nutrisystem Diet" },
    { name: "MIND Diet" },
    { name: "Low FODMAP Diet" },
    
  ];

  // Filtered list based on search input
  const filteredDestinations = destinationOptions
    .filter((destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      Number(b.name.toLowerCase().startsWith(searchTerm.toLowerCase())) -
      Number(a.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/backgroundfour.jpg')] bg-cover bg-center font-serif px-4">
      {showList && (
        <div className="fixed inset-0">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-black transition"
            onClick={() => {
              setShowList(false);
              setSearchTerm("");
              router.push("/rankingeek/front");
            }}
          >
            ✖
          </button>

          {/* Centered Content Container */}
          <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="text-blue-600 font-serif font-[400] text-[25px]">Search your diet plan here </div>
            {/* Search Bar + Dropdown */}
            <div className="w-full max-w-md">
             
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search your diet plan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-12 py-3 rounded-full text-gray-700 text-lg border border-gray-300 shadow-md outline-none transition focus:ring-2 focus:ring-green-400 text-center"
                />

                {/* Dropdown List (appears below the input) */}
                {filteredDestinations.length > 0 && (
                  <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md">
                    {filteredDestinations.map((destination, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push("/rankingeek/userinfo")}
                      >
                        {destination.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* No Results Found */}
              {filteredDestinations.length === 0 && searchTerm.length > 0 && (
                <p className="mt-6 text-gray-500 text-lg">
                  No diet plans found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;   





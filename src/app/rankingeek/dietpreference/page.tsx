"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Specific Dietary Frameworks/Approaches with 10 examples.
const dietaryFrameworks = [
  "Intermittent Fasting",
  "DASH Diet",
  "Glycemic Index Diet",
  "Zone Diet",
  "Blood Type Diet",
  "Anti-Inflammatory Diet",
  "Low-FODMAP Diet",
  "MIND Diet",
  "Atkins Diet",
  "South Beach Diet",
  "Mediterranean Diet",
  "Paleo Diet",
  "Vegan Diet",
  "Whole30",
  "Flexitarian Diet",
  "Macrobiotic Diet",
  "Raw Food Diet",
  "Low-Carb Diet",
  "High-Protein Diet",
  "Plant-Based Diet",
  "Low-Fat Diet",
  "Balanced Diet",
  "Fasting Mimicking Diet",
  "Engine 2 Diet",
  "Slimming World Diet",
  "Jenny Craig Diet",
  "Nutrisystem",
  "HMR Program",
  "Volumetrics Diet",
  "Calorie Counting Diet"
];


// Preferred Foods with 10 examples.
const preferredFoods = [
  "Avocado",
  "Sweet Potatoes",
  "Quinoa",
  "Almonds",
  "Salmon",
  "Kale",
  "Mushrooms",
  "Eggs",
  "Blueberries",
  "Greek Yogurt",
  "Spinach",
  "Broccoli",
  "Chia Seeds",
  "Lentils",
  "Brown Rice",
  "Tomatoes",
  "Raspberries",
  "Walnuts",
  "Oats",
  "Bananas",
  "Bell Peppers",
  "Cucumber",
  "Carrots",
  "Strawberries",
  "Pumpkin Seeds",
  "Edamame",
  "Beets",
  "Asparagus",
  "Brussels Sprouts",
  "Peas"
];


// Disliked Foods with 10 examples.
const dislikedFoods = [
  "Brussels sprouts",
  "Liver",
  "Anchovies",
  "Blue cheese",
  "Okra",
  "Sardines",
  "Cilantro",
  "Durian",
  "Black licorice",
  "Raw onions",
  "Spam",
  "Tofu",
  "Mushrooms",
  "Eggplant",
  "Olives",
  "Pickles",
  "Raw garlic",
  "Limburger Cheese",
  "Stinky Tofu",
  "Snails",
  "Frog Legs",
  "Tripe",
  "Beef Tongue",
  "Blood Sausage",
  "Pâté",
  "Caviar",
  "Kippers",
  "Marmite",
  "Bran Cereal",
  "Processed Cheese"
];


// Cultural or Religious Dietary Restrictions with 10 examples.
const culturalRestrictions = [
  "Halal",
  "Kosher",
  "Alcohol-free",
  "No beef",
  "No pork",
  "Fasting during Ramadan",
  "Vegetarian for religious reasons",
  "No shellfish",
  "No dairy",
  "Gluten-free for religious",
  "No mixing of meat and dairy",
  "Fasting on Yom Kippur",
  "Fasting during Lent",
  "Vegetarian for Hindu traditions",
  "Jain dietary restrictions (no root vegetables)",
  "Avoidance of garlic and onions",
  "Fasting on Ekadashi",
  "Observing Ayurvedic dietary guidelines",
  "Adherence to traditional indigenous diets",
  "Observance of tribal food customs",
  "Avoidance of processed foods for cultural reasons",
  "Consumption of only ritualistically prepared foods",
  "Fasting during mourning periods",
  "No consumption of non-blessed foods",
  "Strict community-based food sourcing",
  "Observance of ancient culinary taboos",
  "Limited intake of modern foods",
  "Ritual fasting on designated holy days",
  "Adherence to ancestral dietary practices",
  "Avoidance of food from non-traditional sources"
];


const dietarySchema = z.object({
  dietaryFramework: z.string().min(1, "Dietary framework is required"),
  preferredFoods: z.string().min(1, "Preferred foods are required"),
  dislikedFoods: z.string().min(1, "Disliked foods are required"),
  culturalRestrictions: z.string().min(1, "Cultural or religious dietary restrictions are required"),
});

type DietaryFormData = z.infer<typeof dietarySchema>;

const DietaryLifestyleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DietaryFormData>({
    resolver: zodResolver(dietarySchema),
  });

  const router = useRouter();

  const onSubmit = async (data: DietaryFormData) => {
    try {
      const res = await fetch("/api/auth/dietaryLifestyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        
        router.push("/rankingeek/nutriationgoal");
      } else {
        const errorData = await res.json();
        console.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-4 font-serif">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Dietary Preferences
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           

            {/* Dietary Framework Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Specific Dietary Framework/Approach:
              </label>
              <input
                {...register("dietaryFramework")}
                type="text"
                placeholder="Type your dietary framework..."
                list="dietaryFrameworkOptions"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="dietaryFrameworkOptions">
                {dietaryFrameworks.map((framework, index) => (
                  <option key={index} value={framework} />
                ))}
              </datalist>
              {errors.dietaryFramework && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dietaryFramework.message}
                </p>
              )}
            </div>

            {/* Preferred Foods Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Preferred Foods:
              </label>
              <input
                {...register("preferredFoods")}
                type="text"
                placeholder="Type your preferred foods..."
                list="preferredFoodsOptions"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="preferredFoodsOptions">
                {preferredFoods.map((food, index) => (
                  <option key={index} value={food} />
                ))}
              </datalist>
              {errors.preferredFoods && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferredFoods.message}
                </p>
              )}
            </div>

            {/* Disliked Foods Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Disliked Foods:
              </label>
              <input
                {...register("dislikedFoods")}
                type="text"
                placeholder="Type your disliked foods..."
                list="dislikedFoodsOptions"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="dislikedFoodsOptions">
                {dislikedFoods.map((food, index) => (
                  <option key={index} value={food} />
                ))}
              </datalist>
              {errors.dislikedFoods && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dislikedFoods.message}
                </p>
              )}
            </div>

            {/* Cultural or Religious Dietary Restrictions Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Cultural or Religious Dietary Restrictions:
              </label>
              <input
                {...register("culturalRestrictions")}
                type="text"
                placeholder="Type your cultural or religious dietary restrictions..."
                list="culturalRestrictionsOptions"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="culturalRestrictionsOptions">
                {culturalRestrictions.map((restriction, index) => (
                  <option key={index} value={restriction} />
                ))}
              </datalist>
              {errors.culturalRestrictions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.culturalRestrictions.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <style jsx>{`
        .hover\\:rotate-3d:hover {
          transform: perspective(1000px)
            rotateY(10deg) rotateX(5deg) scale(1.05);
        }
      `}</style>
    </div>
  );
};
export default DietaryLifestyleForm;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


// Ability to Measure Food Portions options
const foodPortionExamples = [
  "Food scale measurement",
  "Measuring cups usage",
  "Measuring spoons",
  "Visual portion estimation",
  "Hand measurement method",
  "Portion control plates",
  "Calorie counting apps",
  "Standard serving size guidelines",
  "Digital portioning devices",
  "Smart kitchen scales",
  "Pre-portioned meal kits",
  "Portion control containers",
  "Food diary portion tracking",
  "Visual plate division",
  "Nutritional label referencing",
  "Restaurant serving size cues",
  "Digital food log tracking",
  "Weight-based serving estimates",
  "Volume measurement devices",
  "Serving size charts",
  "Food portion photography",
  "Handful approximation",
  "Fist-size serving method",
  "Food portion apps",
  "Dietitian recommended portions",
  "Meal planning software",
  "3D food scanning technology",
  "Standardized food models",
  "Calorie counting journals"
];


// Access to Cooking Facilities options
const cookingFacilitiesExamples = [
  "Fully-equipped home kitchen",
  "Shared community kitchen",
  "Dormitory kitchen",
  "Commercial kitchen",
  "Outdoor grill area",
  "RV kitchen",
  "Portable camping stove setup",
  "University residence kitchen",
  "Apartment kitchenette",
  "Meal prep facility",
  "Food truck kitchen",
  "Mobile food cart",
  "Tiny house kitchen",
  "Boat galley",
  "Converted garage kitchen",
  "Industrial kitchen",
  "Pop-up kitchen",
  "Catering kitchen",
  "Co-working kitchen space",
  "Chef's studio kitchen",
  "Backyard barbecue pit",
  "Open-air kitchen",
  "Rustic farmhouse kitchen",
  "Modern minimalist kitchen",
  "Smart kitchen with connected appliances",
  "Energy-efficient kitchen",
  "Luxury kitchen setup",
  "Compact kitchenette design",
  "Modular kitchen layout",
  "Sous vide station"
];


// Availability of Kitchen Appliances options
const kitchenAppliancesExamples = [
  "Refrigerator",
  "Microwave",
  "Blender",
  "Toaster",
  "Oven",
  "Stand mixer",
  "Coffee maker",
  "Food processor",
  "Air fryer",
  "Dishwasher",
  "Electric Kettle",
  "Slow cooker",
  "Pressure cooker",
  "Rice cooker",
  "Waffle maker",
  "Juicer",
  "Deep fryer",
  "Grill",
  "Induction cooktop",
  "Toaster oven",
  "Sandwich maker",
  "Food steamer",
  "Electric griddle",
  "Bread maker",
  "Ice cream maker",
  "Sous vide cooker",
  "Wine cooler",
  "Garbage disposal",
  "Water purifier",
  "Electric skillet"
];


// Cooking Skills and Experience options
const cookingSkillsExamples = [
  "Basic Knife Skills",
  "Recipe Execution",
  "Baking Expertise",
  "Grilling Techniques",
  "Sautéing Proficiency",
  "Meal Planning",
  "International Cuisine Experience",
  "Sous-Vide Cooking",
  "Plating and Presentation",
  "Food Safety and Sanitation",
  "Steaming Techniques",
  "Roasting Proficiency",
  "Braising and Simmering",
  "Stir-Frying Mastery",
  "Deep Frying Techniques",
  "Pastry Arts",
  "Bread Making Mastery",
  "Cake Baking and Decoration",
  "Chocolate Tempering",
  "Seafood Preparation",
  "Herb and Spice Blending",
  "Canning and Preserving",
  "Fermentation Techniques",
  "Molecular Gastronomy",
  "Vegetable Carving",
  "Garnishing Skills",
  "Sourdough Starter Maintenance",
  "Regional Cuisine Specialization",
  "Vegan Cooking Techniques"
];


const nutritionSchema = z.object({
  foodPortions: z.string().min(1, "Ability to measure food portions is required"),
  cookingFacilities: z.string().min(1, "Access to cooking facilities is required"),
  kitchenAppliances: z.string().min(1, "Availability of kitchen appliances is required"),
  cookingSkills: z.string().min(1, "Cooking skills and experience is required"),
});

type NutritionFormData = z.infer<typeof nutritionSchema>;

const NutritionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NutritionFormData>({
    resolver: zodResolver(nutritionSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: NutritionFormData) => {
    try {
      const res = await fetch("/api/auth/technicaldetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/rankingeek/payment");
      } else {
        const errorData = await res.json();
        console.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6 font-serif">
      {/* Animated Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Animated Title */}
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-bold text-blue drop-shadow-md text-center"
          >
            Technical Details
          </motion.h2>
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Measurement System Field */}
           
            {/* Ability to Measure Food Portions Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Ability to Measure Food Portions
              </label>
              <motion.input
                {...register("foodPortions")}
                type="text"
                placeholder="Type your option..."
                list="foodPortionsOptions"
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <datalist id="foodPortionsOptions">
                {foodPortionExamples.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
              {errors.foodPortions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.foodPortions.message}
                </p>
              )}
            </div>
            {/* Access to Cooking Facilities Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Access to Cooking Facilities
              </label>
              <motion.input
                {...register("cookingFacilities")}
                type="text"
                placeholder="Type your option..."
                list="cookingFacilitiesOptions"
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <datalist id="cookingFacilitiesOptions">
                {cookingFacilitiesExamples.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
              {errors.cookingFacilities && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingFacilities.message}
                </p>
              )}
            </div>
            {/* Availability of Kitchen Appliances Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Availability of Kitchen Appliances
              </label>
              <motion.input
                {...register("kitchenAppliances")}
                type="text"
                placeholder="Type your option..."
                list="kitchenAppliancesOptions"
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <datalist id="kitchenAppliancesOptions">
                {kitchenAppliancesExamples.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
              {errors.kitchenAppliances && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.kitchenAppliances.message}
                </p>
              )}
            </div>
            {/* Cooking Skills and Experience Field (full width on md) */}
            <div >
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Cooking Skills and Experience
              </label>
              <motion.input
                {...register("cookingSkills")}
                type="text"
                placeholder="Type your option..."
                list="cookingSkillsOptions"
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <datalist id="cookingSkillsOptions">
                {cookingSkillsExamples.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
              {errors.cookingSkills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cookingSkills.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default NutritionForm;

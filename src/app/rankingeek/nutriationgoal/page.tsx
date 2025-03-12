"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Weight management options
const weightManagementExamples = [
  "Balanced Diet",
  "Regular Physical Activity",
  "Portion Control",
  "Mindful Eating",
  "Behavior Modification",
  "Self-Monitoring",
  "Meal Planning",
  "Nutritional Counseling",
  "Stress Management",
  "Sleep Hygiene",
  "Weight Loss",
  "Weight Gain",
  "Weight Maintenance",
  "Calorie Counting",
  "Intermittent Fasting",
  "High-Protein Diet",
  "Low-Carb Diet",
  "Meal Replacement Shakes",
  "Food Journaling",
  "Structured Exercise Program",
  "Strength Training",
  "Cardio Workouts",
  "Increase Dietary Fiber",
  "Behavioral Therapy",
  "Motivational Interviewing",
  "Health Coaching",
  "Metabolic Testing",
  "Glycemic Control",
  "Sustainable Lifestyle Changes",
  "Increased Water Intake",
  "Nutrient Timing",
  "Consistent Meal Schedule",
  "Smart Snacking"
];

// Specific Nutrient Targets
const nutrientTargetsExamples = [
  "Balanced Diet",
  "Regular Physical Activity",
  "Portion Control",
  "Mindful Eating",
  "Behavior Modification",
  "Self-Monitoring",
  "Meal Planning",
  "Nutritional Counseling",
  "Stress Management",
  "Sleep Hygiene",
  "Increase Protein Intake",
  "Enhance Fiber Intake",
  "Boost Omega-3 Fatty Acids",
  "Increase Antioxidant Consumption",
  "Optimize Micronutrient Balance",
  "Limit Added Sugars",
  "Monitor Saturated Fat Intake",
  "Maintain Adequate Iron Levels",
  "Increase Calcium Intake",
  "Boost Vitamin D Levels",
  "Optimize Vitamin C Consumption",
  "Ensure Adequate B Vitamins",
  "Increase Whole Grain Consumption",
  "Enhance Vegetable Intake",
  "Increase Fruit Intake",
  "Maintain Hydration Levels",
  "Optimize Potassium Intake",
  "Reduce Sodium Intake",
  "Target Healthy Fat Ratios",
  "Balance Omega-6 and Omega-3 Ratios"
];

// Specific Health-Related Goals
const healthGoalsExamples = [
  "Lower Blood Pressure",
  "Reduce LDL Cholesterol",
  "Improve Blood Sugar Control",
  "Increase Cardiovascular Endurance",
  "Enhance Muscular Strength",
  "Improve Flexibility",
  "Achieve a Healthy Body Weight",
  "Improve Sleep Quality",
  "Reduce Stress Levels",
  "Boost Overall Energy Levels",
  "Enhance Immune Function",
  "Increase Bone Density",
  "Improve Digestive Health",
  "Enhance Mental Clarity",
  "Boost Metabolic Rate",
  "Improve Joint Mobility",
  "Enhance Core Stability",
  "Reduce Inflammation",
  "Improve Posture",
  "Increase Respiratory Capacity",
  "Enhance Recovery Time",
  "Improve Hormonal Balance",
  "Reduce Visceral Fat",
  "Enhance Skin Health",
  "Improve Circulation",
  "Boost Cognitive Function",
  "Increase Functional Strength",
  "Improve Balance and Coordination",
  "Reduce Anxiety and Depression",
  "Increase Stamina and Endurance"
];


// Validation schema for the complete form
const nutritionSchema = z.object({
  weightManagement: z.string().min(1, "Weight management option is required"),
  nutrientTargets: z.string().min(1, "Specific nutrient target is required"),
  healthGoals: z.string().min(1, "Specific health-related goal is required"),
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
      const res = await fetch("/api/auth/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/rankingeek/eatinghabits");
      } else {
        const errorData = await res.json();
        console.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-serif bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6">
    
      {/* Animated Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8 bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Animated Title */}
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl font-bold text-blue drop-shadow-md"
      >
        Nutritional Goals
      </motion.h2>
      {/* Weight Management Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Weight Management Option
            </label>
            <motion.input
              {...register("weightManagement")}
              type="text"
              placeholder="Type your weight management option..."
              list="weightManagementOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="weightManagementOptions">
              {weightManagementExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.weightManagement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.weightManagement.message}
              </p>
            )}
          </div>

          {/* Specific Nutrient Targets Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Specific Nutrient Target
            </label>
            <motion.input
              {...register("nutrientTargets")}
              type="text"
              placeholder="Type your specific nutrient target..."
              list="nutrientTargetsOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="nutrientTargetsOptions">
              {nutrientTargetsExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.nutrientTargets && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nutrientTargets.message}
              </p>
            )}
          </div>

          {/* Specific Health-Related Goals Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Specific Health-Related Goal
            </label>
            <motion.input
              {...register("healthGoals")}
              type="text"
              placeholder="Type your specific health-related goal..."
              list="healthGoalsOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="healthGoalsOptions">
              {healthGoalsExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.healthGoals && (
              <p className="text-red-500 text-sm mt-1">
                {errors.healthGoals.message}
              </p>
            )}
          </div>

          {/* Animated Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full py-3 text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default NutritionForm;

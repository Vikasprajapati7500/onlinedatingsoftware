"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Eating habits options (existing)
const eatingHabitsExamples = [
  "Mindful Eating",
  "Intermittent Fasting",
  "Regular Meal Times",
  "Portion Control",
  "Balanced Diet",
  "Frequent Snacking",
  "No Late-Night Eating",
  "Home-Cooked Meals",
  "Plant-Based Eating",
  "Hydration Focus",
  "Intuitive Eating",
  "Slow Eating",
  "Scheduled Meal Prep",
  "Food Diary Tracking",
  "Calorie Counting",
  "High-Fiber Diet",
  "Low-Carb Eating",
  "Whole Foods Focus",
  "Organic Food Preference",
  "Avoiding Processed Foods",
  "Regular Breakfast Consumption",
  "Limited Snacking Between Meals",
  "Balanced Macronutrients",
  "Portion Size Awareness",
  "Eating Without Distractions",
  "Time-Restricted Eating",
  "Listening to Hunger Cues",
  "Mindful Chewing",
  "Frequent Vegetable Intake",
  "Low-Sugar Diet"
];


// Preference for Bigger Meals in the Morning or Evening options
const mealPreferenceExamples = [
  "A breakfast of eggs, avocado, whole-grain toast, and a smoothie.",
  "Larger breakfast featuring eggs, whole-grain toast, and fruit.",
  "Hearty dinner with steak, roasted vegetables, and quinoa.",
  "Big morning meal with oatmeal, nuts, and berries.",
  "Substantial evening plate of pasta, salad, and garlic bread.",
  "Robust breakfast including pancakes, bacon, and scrambled eggs.",
  "Generous dinner with grilled salmon, rice, and steamed broccoli.",
  "Dominant breakfast with a veggie omelette, avocado, and smoothie.",
  "Light lunch with a quinoa salad, mixed greens, and grilled chicken.",
  "Afternoon snack of Greek yogurt with honey and almonds.",
  "Evening meal featuring vegetable stir-fry with tofu and brown rice.",
  "Hearty brunch with eggs Benedict, fruit salad, and mimosas.",
  "Midday meal of a turkey sandwich on whole-grain bread with avocado and spinach.",
  "Simple dinner with roasted chicken, sweet potatoes, and steamed green beans.",
  "Healthy lunch bowl with brown rice, black beans, corn, and salsa.",
  "Early breakfast smoothie bowl with mixed berries, banana, and chia seeds.",
  "Protein-packed dinner with grilled shrimp, wild rice, and asparagus.",
  "Light breakfast of yogurt parfait with granola, honey, and fruit.",
  "Traditional lunch with a mixed greens salad, cherry tomatoes, and feta cheese.",
  "Comfort dinner featuring homemade vegetable soup, whole-grain bread, and a side salad.",
  "Vegan dinner with lentil stew, steamed kale, and brown rice.",
  "Quick lunch of avocado toast topped with a poached egg and arugula.",
  "Rustic dinner plate with roast beef, mashed potatoes, and steamed carrots.",
  "Exotic dinner with curry chickpeas, basmati rice, and naan bread.",
  "Seasonal brunch with buttermilk pancakes, fresh berries, and maple syrup.",
  "Mediterranean lunch with hummus, pita bread, tabbouleh, and falafel.",
  "Light dinner featuring grilled vegetable skewers, couscous, and tzatziki.",
  "Early morning meal of chia pudding with almond milk, topped with sliced bananas and walnuts."
];


// Eating Out vs. Cooking at Home options
const diningPreferenceExamples = [
  "Restaurant Dining",
  "Dine-In",
  "Eat-Out Experience",
  "Fast Food",
  "Takeaway",
  "Cafe Bite",
  "Gourmet Outing",
  "Food Delivery",
  "Urban Eatery",
  "Commercial Cuisine",
  "Buffet Indulgence ",
  "Fine Dining ",
  "Cultural Restaurant Experience",
  "Outdoor Patio Dining",
  "Chef's Special",
  "Interactive Dining ",
  "Multi-Course Tasting ",
  "Themed Restaurant",
  "Social Dining Out",
  "Food Truck Adventuret",
  "Restaurant Buffet",
  "Upscale Dining",
  "Date Night Dining",
  "Brunch Out",
  "Street Food",
  "Dine-Out Extravaganza",
  "Exotic Cuisine Out",
  "Family Restaurant",
  "Festive Dining Out",
  "Group Dining Experience"
];


const nutritionSchema = z.object({
  eatingHabits: z.string().min(1, "Eating habit is required"),
  mealPreference: z.string().min(1, "Meal preference is required"),
  diningPreference: z.string().min(1, "Dining preference is required"),
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
      const res = await fetch("/api/auth/eatinghabits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/rankingeek/technicaldetails");
      } else {
        const errorData = await res.json();
        console.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6 font-serif">
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
           Eating Habits
          </motion.h2>

          {/* Eating Habits Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select an Eating Habit
            </label>
            <motion.input
              {...register("eatingHabits")}
              type="text"
              placeholder="Type your eating habit..."
              list="eatingHabitsOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="eatingHabitsOptions">
              {eatingHabitsExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.eatingHabits && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eatingHabits.message}
              </p>
            )}
          </div>

          {/* Meal Preference Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Meal Preference (Bigger Meals in Morning/Evening)
            </label>
            <motion.input
              {...register("mealPreference")}
              type="text"
              placeholder="Type your meal preference..."
              list="mealPreferenceOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="mealPreferenceOptions">
              {mealPreferenceExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.mealPreference && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mealPreference.message}
              </p>
            )}
          </div>

          {/* Dining Preference Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Dining Preference
            </label>
            <motion.input
              {...register("diningPreference")}
              type="text"
              placeholder="Type your dining preference..."
              list="diningPreferenceOptions"
              whileFocus={{ scale: 1.05 }}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <datalist id="diningPreferenceOptions">
              {diningPreferenceExamples.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {errors.diningPreference && (
              <p className="text-red-500 text-sm mt-1">
                {errors.diningPreference.message}
              </p>
            )}
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

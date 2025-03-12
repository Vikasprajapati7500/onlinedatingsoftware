"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";    
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Updated schema: one field per question, since suggestions are provided via datalists.
const signupFormData = z.object({
  activitylevel: z.string().min(1, { message: "Activity level is required" }),
  dailyRoutine: z.string().min(1, { message: "Daily routine is required" }),
  averageSleep: z.string().min(1, { message: "Average sleep time is required" }),
  stressLevel: z.string().min(1, { message: "Stress and Mental Wellbeing is required" }),
  digitalUsage: z.string().min(1, { message: "Screen Time and Digital Device Usage is required" }),
  recreational: z.string().min(1, { message: "Social and Recreational Activities is required" }),
});

type SignupFormData = z.infer<typeof signupFormData>;

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormData),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/lifestyleinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/rankingeek/dietpreference");
      } else {
        const result = await res.json();
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Predefined suggestions for each field (without 'Other')
  const activityOptions = [
    "Inactive",
    "Lightly active",
    "Moderately active",
    "Very active",
    "Sedentary",
    "Low Activity",
    "Active",
    "Highly Active",
    "Extremely Active",
    "Minimal Movement",
    "Occasionally Active",
    "Recreationally Active",
    "Regularly Active",
    "Fitness Enthusiast",
    "Casual Exerciser",
    "Energetic",
    "Dynamic",
    "On the Move",
    "Non-sedentary",
    "Agile",
    "Sporty",
    "Physically Fit",
    "Busy Lifestyle",
    "Constantly Moving"
  ];
  
  const routineOptions = [
    "Desk job",
    "Physically demanding job",
    "Remote work",
    "Hybrid work",
    "Shift work",
    "Manual labor",
    "Customer service role",
    "Retail work",
    "Healthcare professional",
    "Teaching/Academic role",
    "Sales job",
    "Industrial work",
    "Construction work",
    "Logistics/Delivery job",
    "Freelance work",
    "Entrepreneurial work",
    "Agricultural work",
    "Service industry work",
    "Factory work",
    "Call center representative",
    "Creative/Design work",
    "Consulting work"
  ];
  
  const sleepOptions = [
    "Less than 6 hours",
    "6-7 hours",
    "7-8 hours",
    "More than 8 hours",
    "Less than 4 hours",
    "4-5 hours",
    "5-6 hours",
    "8-9 hours",
    "9-10 hours",
    "10-11 hours",
    "More than 11 hours",
    "Interrupted sleep",
    "Sleep with naps",
    "Nighttime awakenings",
    "Consistent sleep schedule",
    "Irregular sleep schedule",
    "Polyphasic sleep pattern",
    "Biphasic sleep pattern",
    "Sleep debt accumulation",
    "Catch-up sleep",
    "Optimal sleep duration",
    "Excessive sleep duration",
    "Variable sleep duration",
    "Fragmented sleep pattern"
  ];
  
  const stressOptions = [
    "Self-perceived Stress Level",
    "Frequency of Overwhelm",
    "Anxiety and Worry",
    "Emotional Regulation",
    "Coping Resources/Strategies",
    "Work-Life Balance",
    "Social Support and Stress",
    "Mindfulness and Relaxation Practices",
    "Sleep and Stress Impact",
    "Resilience and Recovery",
    "Physical Symptoms of Stress",
    "Stress Triggers Identification",
    "Time Management Under Stress",
    "Financial Stress Concerns",
    "Interpersonal Conflict",
    "Job Insecurity",
    "Burnout Risk",
    "Workload Pressure",
    "Environmental Stressors",
    "Crisis Management",
    "Emotional Outbursts",
    "Stress-Induced Fatigue",
    "Cognitive Overload",
    "Perceived Control",
    "Stress Coping Self-Efficacy",
    "Impact of Stress on Relationships",
    "Anger Management",
    "Stress Recovery Time",
    "Stress and Decision Making",
    "Stress-related Behavioral Changes"
  ];
  
  const digitalOptions = [
    "Less than 1 hour",
    "1-2 hours",
    "2-3 hours",
    "3-4 hours",
    "4-5 hours",
    "5-6 hours",
    "6-7 hours",
    "7-8 hours",
    "8-9 hours",
    "More than 9 hours"
  ];
  
  const recreationalOptions = [
    "Dinner with Friend",
    "Movie Night",
    "Game Night",
    "Coffee Meetup",
    "Book Club",
    "Outdoor Picnic",
    "Concert Outing",
    "Art Workshop",
    "Sports Event",
    "Volunteer Gathering",
    "Hiking Trip",
    "Yoga Class",
    "Cooking Class",
    "Dance Class",
    "Karaoke Night",
    "Museum Visit",
    "Art Gallery Tour",
    "Beach Day",
    "Camping Trip",
    "Biking Adventure",
    "Fitness Bootcamp",
    "Scenic Drive",
    "Food Festival",
    "Photography Walk",
    "Meditation Session",
    "Wine Tasting",
    "Farmers Market Visit",
    "Local Theater Show",
    "Board Game Café",
    "Poetry Reading"
  ];
  

  return (
    <div className="min-h-screen flex items-center justify-center font-serif bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-white p-8 rounded shadow-2xl w-full max-w-4xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Lifestyle Information
        </h1>
        <div className="space-y-4">
          {/* Row 1: Activity Level and Daily Routine */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label htmlFor="activitylevel" className="block text-gray-700 mb-2">
                Activity Level
              </label>
              <input
                id="activitylevel"
                type="text"
                placeholder="Type your activity level"
                {...register("activitylevel")}
                list="activityOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <datalist id="activityOptions">
                {activityOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.activitylevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.activitylevel.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="dailyRoutine" className="block text-gray-700 mb-2">
                Daily Routine
              </label>
              <input
                id="dailyRoutine"
                type="text"
                placeholder="Type your daily routine"
                {...register("dailyRoutine")}
                list="routineOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <datalist id="routineOptions">
                {routineOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.dailyRoutine && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dailyRoutine.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Average Sleep Time and Stress and Mental Wellbeing */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label htmlFor="averageSleep" className="block text-gray-700 mb-2">
                Average Sleep Time (Hours per night)
              </label>
              <input
                id="averageSleep"
                type="text"
                placeholder="Type your sleep time"
                {...register("averageSleep")}
                list="sleepOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <datalist id="sleepOptions">
                {sleepOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.averageSleep && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.averageSleep.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="stressLevel" className="block text-gray-700 mb-2">
                Stress and Mental Wellbeing
              </label>
              <input
                id="stressLevel"
                type="text"
                placeholder="Type your stress level"
                {...register("stressLevel")}
                list="stressOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <datalist id="stressOptions">
                {stressOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.stressLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stressLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Screen Time and Digital Device Usage and Social and Recreational Activities */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label htmlFor="digitalUsage" className="block text-gray-700 mb-2">
                Screen Time and Digital Device Usage
              </label>
              <input
                id="digitalUsage"
                type="text"
                placeholder="Type your digital usage"
                {...register("digitalUsage")}
                list="digitalOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <datalist id="digitalOptions">
                {digitalOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.digitalUsage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.digitalUsage.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="recreational" className="block text-gray-700 mb-2">
                Social and Recreational Activities
              </label>
              <input
                id="recreational"
                type="text"
                placeholder="Type your recreational activity"
                {...register("recreational")}
                list="recreationalOptions"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <datalist id="recreationalOptions">
                {recreationalOptions.map((option, idx) => (
                  <option key={idx} value={option} />
                ))}
              </datalist>
              {errors.recreational && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.recreational.message}
                </p>
              )}
            </div>
          </div>
          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
     </div>
  );
};
export default Home;

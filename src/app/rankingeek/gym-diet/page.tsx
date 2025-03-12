"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  age:z.string().min(1, { message:"Age is required"}),
  gender:z.string().min(1, { message:"Gender is required"}),
  height: z.string().min(1, { message: "Height is required" }),
  weight:z.string().min(1, {message:"Weight is required"}),
  activityLevel:z.string().min(1,{message:"ActivityLevel is required"}),
  healthGoal:z.string().min(1,{message:"HealthGoal is required"}),
  workingHours:z.string().min(1,{message: "WorkingHours is required"}),
  workType:z.string().min(1,{message:"WorkType is required"}),
  mealPreference:z.string().min(1,{message:"MealPreferance is required"}),
  dietaryRestrictions:z.string().min(1,{message:"DietaryRestrictions is required"}),
});

type SignupFormData = z.infer<typeof formSchema>;
  
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<SignupFormData>({
      resolver: zodResolver(formSchema),
});

const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/gymdiet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/rankingeek/signup");
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
  
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Health Assessment Form</h2>

        {/* Basic Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number"  placeholder="Age" 
              {...register("age")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}


            <select  
             {...register("gender")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}


            <input type="text" 
             placeholder="Height (cm)" 
             {...register("height")}
             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}

            <input type="text" 
             placeholder="Weight (kg)" 
             {...register("weight")}
             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
             {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}

            <select 
               {...register("activityLevel")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
            {errors.activityLevel && <p className="text-red-500 text-sm">{errors.activityLevel.message}</p>}
          </div>
        </div>

        {/* Health Goals */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Health Goals</h3>
          <select 
          {...register("healthGoal")}
           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="maintain_weight">Maintain Weight</option>
          </select>
          {errors.healthGoal && <p className="text-red-500 text-sm">{errors.healthGoal.message}</p>}
        </div>

        {/* Lifestyle Factors */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Lifestyle Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select 
            {...register("workingHours")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Working Hours</option>
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
            </select>
            {errors.workingHours && <p className="text-red-500 text-sm">{errors.workingHours.message}</p>}

            <select 
            {...register("workType")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Type of Work</option>
              <option value="sedentary">Sedentary</option>
              <option value="active">Active</option>
            </select>
            {errors.workType && <p className="text-red-500 text-sm">{errors.workType.message}</p>}

            <select
            {...register("mealPreference")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Meal Preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non_vegetarian">Non-Vegetarian</option>
            </select>
            {errors.mealPreference && <p className="text-red-500 text-sm">{errors.mealPreference.message}</p>}
        </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Dietary Restrictions</h3>
          <select  
          {...register("dietaryRestrictions")}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select Restriction</option>
            <option value="allergies">Allergies</option>
            <option value="intolerances">Intolerances</option>
            <option value="religious restrictions">Religious Restrictions</option>
          </select>
        </div>
        {errors.dietaryRestrictions && <p className="text-red-500 text-sm">{errors.dietaryRestrictions.message}</p>} 
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300" 
         type="submit"
         disabled={loading}
        
        >
        {loading ? "Submitting...":"Submit"}
        </button>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
 </form>
</div>
);
 };
export default Page;





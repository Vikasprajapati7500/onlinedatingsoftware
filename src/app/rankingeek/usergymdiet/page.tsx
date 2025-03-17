"use client";
import { useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ----------------------- TYPES ----------------------- 
type Signup = {
  id: number;
  userId: number;
  healthCondition: string;
  medication: string;
  allergy: string;
  dietaryPreference: string;
  familyMedicalHistory: string;
  supplement: string;
  substance: string;
  surgery: string;
  nutritionalDeficiency: string;
};

type Lifestyleinfo = {
  id: number;
  userId: number;
  activitylevel: string;
  dailyRoutine: string;
  averageSleep: string;
  stressLevel: string;
  digitalUsage: string;
  recreational: string;
};

type DietaryPreference = {
  id: number;
  userId: number;
  dietaryFramework: string;
  preferredFoods: string;
  dislikedFoods: string;
  culturalRestrictions: string;
};

type NutritionalDeficiency = {
  id: number;
  userId: number;
  weightManagement: string;
  nutrientTargets: string;
  healthGoals: string;
};

type EatingHabits = {
  id: number;
  userId: number;
  eatingHabits: string;
  mealPreference: string;
  diningPreference: string;
};

type TechnicalDetails = {
  id: number;
  userId: number;
  foodPortions: string;
  cookingFacilities: string;
  kitchenAppliances: string;
  cookingSkills: string;
};

type Basicsdemographics = {
  id: number;
  userId: number;
  age: number;
  gender: number;
  heightFt: number;
  heightIn: number;
  weight: number;
  country: number;
  state: number;
};

// Each option now is an object with recipe and link fields.
type MealOption = {
  recipe: string;
  link: string;
};

// -------------------- ORIGINAL MEAL PLAN DATA TYPE --------------------
// Updated so that each day’s entry is a MealOption.
type MealPlanData = {
  mealPlanTable: {
    Breakfast: { [day: string]: MealOption };
    Lunch: { [day: string]: MealOption };
    "Evening Meal": { [day: string]: MealOption };
    Snacks: { [day: string]: MealOption };
  };
  nutritionalSummary: {
    energy: string;
    saturatedFat: string;
    totalCarbohydrates: string;
    calcium: string;
    iron: string;
    salt: string;
    fruitVeg: string;
  };
  toNote: string[];
  topTips: string[];
  freeSugars: string[];
  fibre: string[];
};

// -------------------- NEW WRAPPER TYPE FOR MULTIPLE MEAL PLANS --------------------
type AllMealPlansData = {
  mealPlanOptions: MealPlanData[];
};

const MealPlanPage: NextPage = () => {
  const [signupAdmin, setSignupAdmin] = useState<Signup[]>([]);
  const [lifestyleData, setLifestyleData] = useState<Lifestyleinfo[]>([]);
  const [dietaryPreferenceData, setDietaryPreferenceData] = useState<DietaryPreference[]>([]);
  const [nutritionalDeficiencyData, setNutritionalDeficiencyData] = useState<NutritionalDeficiency[]>([]);
  const [eatingHabitsData, setEatingHabitsData] = useState<EatingHabits[]>([]);
  const [technicalDetailsData, setTechnicalDetailsData] = useState<TechnicalDetails[]>([]);
  const [basicsdemographics, setbasicsdemographics] = useState<Basicsdemographics[]>([]);

  // State to hold the generated meal plan options (expecting 3 options)
  const [mealPlan, setMealPlan] = useState<AllMealPlansData | null>(null);
  const [loading, setLoading] = useState(true);

  // Assume this is the current user who just submitted the form.
  const currentUserId = 123;

  // Reference for the content to convert to PDF (excludes the download button)
  const contentRef = useRef<HTMLDivElement>(null);

  // ---------------- FETCH FUNCTION ----------------
  const fetchData = async (endpoint: string) => {
    try {
      const res = await fetch(`${endpoint}?userId=${currentUserId}`);
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [data];
      } else {
        console.error(`Failed to fetch data from ${endpoint}`);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return [];
    }
  };

  // -------------------- FETCH ALL DATA ------------------
  const fetchAllData = async () => {
    const [
      signup,
      lifestyle,
      dietaryPreference,
      nutritionalDeficiency,
      eatingHabits,
      technicalDetails,
      basicsdemographic,
    ] = await Promise.all([
      fetchData("/api/healthinfo"),
      fetchData("/api/lifestyleinfo"),
      fetchData("/api/dietpreference"),
      fetchData("/api/nutriationgoal"),
      fetchData("/api/eatinghabits"),
      fetchData("/api/technicaldetails"),
      fetchData("/api/basicsdemo"),
    ]);
    setSignupAdmin(signup);
    setLifestyleData(lifestyle);
    setDietaryPreferenceData(dietaryPreference);
    setNutritionalDeficiencyData(nutritionalDeficiency);
    setEatingHabitsData(eatingHabits);
    setTechnicalDetailsData(technicalDetails);
    setbasicsdemographics(basicsdemographic);
  };

  // -------------------- CALL BACKEND ENDPOINT TO GENERATE MEAL PLAN ------------------
  const generateMealPlan = async () => {
    const payload = {
      signupAdmin,
      lifestyleData,
      dietaryPreferenceData,
      nutritionalDeficiencyData,
      eatingHabitsData,
      technicalDetailsData,
      basicsdemographics,
    };

    try {
      const response = await fetch("/api/auth/generateDiet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        // Expecting three distinct meal plan options in the response.
        const generatedMealPlan = await response.json();
        setMealPlan(generatedMealPlan);
      } else {
        console.error("Failed to generate meal plan");
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
    }
  };

  // -------------------- INITIALIZE DATA & MEAL PLAN ------------------
  useEffect(() => {
    const initialize = async () => {
      await fetchAllData();
      await generateMealPlan();
      setLoading(false);
    };
    initialize();
  }, [currentUserId]);

  // Define the meal types and days.
  const meals: (keyof MealPlanData["mealPlanTable"])[] = ["Breakfast", "Lunch", "Evening Meal", "Snacks"];
  const days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // -------------------- DOWNLOAD PDF HANDLER ------------------
  const handleDownloadPdf = async () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, {
        scale: 2,
        scrollY: -window.scrollY,
        height: contentRef.current.scrollHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("meal-plan.pdf");
      });
    }
  };

  return (
    <div className="min-h-screen p-6 font-sans bg-[#E3F2FD]">
      {/* Download button (outside contentRef so not captured in PDF) */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div ref={contentRef}>
        <h1 className="text-center font-extrabold text-4xl mb-8 font-serif text-blue-600">
          Adult Weekly Meal Plan
        </h1>

        {loading || !mealPlan ? (
          <p className="text-center">Loading meal plan...</p>
        ) : (
          <>
            <div className="font-serif font-[500] text-green-500 text-[35px] pl-7">
              Hey, This is your meal plan for the week
            </div>
            <div className="font-serif text-gray-600 pl-7">
              This is your meal plan. If you want to keep yourself fit, follow this diet properly. We hope that by following this diet, you will remain completely fit and your body will be well maintained.
            </div>

            {/* ---------------- TABLE: 3 Options per Meal & Day ---------------- */}
            <table className="meal-table table-auto w-full border-collapse mb-8 text-sm bg-blue-50 mt-8 font-serif">
              <thead>
                <tr>
                  <th className="p-2 border text-left bg-green-600 text-white">Meal / Day</th>
                  {days.map((day) => (
                    <th key={day} className="p-2 border text-left bg-green-600 text-white">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal}>
                    <td className="font-bold bg-green-600 border p-2 text-white">{meal}</td>
                    {days.map((day) => (
                      <td key={day} className="border p-2">
                        {mealPlan.mealPlanOptions.map((option, idx) => {
                          // Each cell expects an object of type MealOption.
                          const mealOption = option.mealPlanTable[meal][day];
                          return (
                            <div key={idx} className="mb-2">
                              <strong>Option {idx + 1}:</strong> {mealOption.recipe}{" "}
                              <a
                                href={mealOption.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                (Details)
                              </a>
                            </div>
                          );
                        })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ---------- Display details only for Option 1 ---------- */}
            {mealPlan.mealPlanOptions.map((option, optionIndex) =>
              optionIndex === 0 ? (
                <div key={optionIndex} className="mb-12">
                  <p className="text-green-600 font-bold text-base mb-2 font-serif pl-7">
                    TO NOTE :
                  </p>
                  <ul className="list-disc ml-5 text-green-600 mb-8 font-serif pl-7">
                    {option.toNote.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                  <p className="text-blue-600 font-bold text-base mb-2 font-serif pl-7">
                    TOP TIPS :
                  </p>
                  <ul className="list-disc ml-5 text-blue-600 mb-8 font-serif pl-7">
                    {option.topTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                  <table className="nutritional-table table-auto w-full border-collapse mb-8 text-sm bg-green-50 font-serif">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="p-2 border text-left"></th>
                        <th className="p-2 border text-left">Energy (kcal)</th>
                        <th className="p-2 border text-left">
                          Saturated Fat
                          <br />
                          (total % energy)
                        </th>
                        <th className="p-2 border text-left">
                          Total Carbohydrates
                          <br />
                          (inc. fibre, % energy)
                        </th>
                        <th className="p-2 border text-left">Calcium (mg)</th>
                        <th className="p-2 border text-left">Iron (mg)</th>
                        <th className="p-2 border text-left">Salt (g)</th>
                        <th className="p-2 border text-left">
                          Fruit &amp; Veg
                          <br />
                          (portions)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold bg-green-500 border p-2 text-white">
                          Our Meal Plan
                        </td>
                        <td className="border p-2">{option.nutritionalSummary.energy}</td>
                        <td className="border p-2">{option.nutritionalSummary.saturatedFat}</td>
                        <td className="border p-2">{option.nutritionalSummary.totalCarbohydrates}</td>
                        <td className="border p-2">{option.nutritionalSummary.calcium}</td>
                        <td className="border p-2">{option.nutritionalSummary.iron}</td>
                        <td className="border p-2">{option.nutritionalSummary.salt}</td>
                        <td className="border p-2">{option.nutritionalSummary.fruitVeg}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h2 className="text-xl font-bold text-gray-800 mt-5 mb-2 font-serif pl-7">
                    What about FREE SUGARS?
                  </h2>
                  <ul className="list-disc ml-5 text-green-600 mb-8 font-serif pl-7">
                    {option.freeSugars.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h2 className="text-xl font-bold text-gray-800 mt-5 mb-2 font-serif pl-7">
                    What about FIBRE?
                  </h2>
                  <ul className="list-disc ml-5 text-green-600 mb-8 font-serif pl-7">
                    {option.fibre.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MealPlanPage;

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Updated health form schema without separate "Other" fields.
const healthFormSchema = z.object({
  healthCondition: z.string().min(1, "Health condition is required"),
  medication: z.string().min(1, "Medication Affecting is required"),
  allergy: z.string().min(1, "Allergy is required"),
  dietaryPreference: z.string().min(1, "Dietary Preference is required"),
  familyMedicalHistory: z.string().min(1, "Family Medical History is required"),
  supplement: z.string().min(1, "Supplement Use is required"),
  substance: z.string().min(1, "Substance Use is required"),
  surgery: z.string().min(1, "Past Surgery is required"),
  nutritionalDeficiency: z.string().min(1, "Nutritional Deficiency is required"),
});

type HealthFormData = z.infer<typeof healthFormSchema>;

const healthConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Thyroid Disorders",
  "Asthma",
  "Chronic Kidney Disease",
  "Obesity",
  "Rheumatoid Arthritis",
  "Depression",
  "Anxiety Disorders",
  "Cancer",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Osteoarthritis",
  "Alzheimer's Disease",
  "Epilepsy",
  "Stroke",
  "Inflammatory Bowel Disease (IBD)",
  "Gastroesophageal Reflux Disease (GERD)",
  "Fibromyalgia",
  "Osteoporosis",
  "Migraine",
  "HIV/AIDS",
  "Anemia",
  "Multiple Sclerosis",
  "Parkinson's Disease",
];


const medicationsAffectingDiet = [
  "Insulin",
  "Blood Pressure Medications",   
  "Thyroid Medications",
  "Steroids",
  "Antidepressants",
  "Metformin",
  "Statins",
  "Beta-Blockers",
  "ACE Inhibitors",
  "Calcium Channel Blockers",
  "Antipsychotics",
  "Anticonvulsants",
  "Lithium",
  "Oral Contraceptives",
  "Immunosuppressants",
  "Chemotherapy Agents",
  "Antiretroviral Drugs",
  "Proton Pump Inhibitors",
  "H2 Blockers",
  "GLP-1 Agonists",
  "SGLT2 Inhibitors",
  "Antiemetics",
  "Opioids",
  "Thiazolidinediones",
  "Antihistamines"
];


const allergies = [
  "Gluten Intolerance",
  "Lactose Intolerance",
  "Nut Allergies",
  "Shellfish Allergies",
  "Pollen Allergies",
  "Dust Mite Allergy",
  "Pet Dander Allergy",
  "Mold Allergy",
  "Egg Allergy",
  "Soy Allergy",
  "Fish Allergy",
  "Wheat Allergy",
  "Insect Sting Allergy",
  "Latex Allergy",
  "Penicillin Allergy",
  "Sulfite Allergy",
  "Fragrance Allergy",
  "Nickel Allergy",
  "Sun Allergy (Photosensitivity)",
  "Cockroach Allergy",
  "Citrus Allergy",
  "Additive Allergy (e.g., MSG)",
  "Colorant Allergy",
  "Alcohol Allergy",
  "Histamine Intolerance"
];

const dietaryPreferences = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Spicy Food",
  "Dairy-Free",
  "Gluten-Free",
  "Low-Carb",
  "Low-Fat",
  "Whole30",
  "Mediterranean",
  "Intermittent Fasting",
  "Raw Food",
  "High-Protein",
  "Anti-Inflammatory",
  "Low-Sodium",
  "Plant-Based",
  "Sugar-Free",
  "Nut-Free",
  "Organic",
  "Macrobiotic",
  "Flexitarian",
  "Lactose-Free",
  "Low Glycemic",
  "DASH Diet",
  "Zone Diet"
];


const physicalActivityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Highly Active",
  "Very Sedentary",
  "Somewhat Active",
  "Active",
  "Very Active",
  "Athletic",
  "Recreationally Active",
  "Regularly Exercising",
  "Fitness Enthusiast",
  "Weekend Warrior",
  "Competitive Athlete",
  "Intensive Training",
  "Endurance Focused",
  "Strength Focused",
  "Cardio Focused",
  "HIIT Specialist"
];




const familyMedicalHistory = [
  "Heart Disease",
  "Diabetes",
  "Cancer",
  "Genetic Disorders",
  "Hypertension",
  "Stroke",
  "Osteoporosis",
  "Arthritis",
  "Autoimmune Diseases",
  "Alzheimer's Disease",
  "Parkinson's Disease",
  "Epilepsy",
  "Asthma",
  "Hypercholesterolemia",
  "Kidney Disease",
  "Liver Disease",
  "Thyroid Disorders",
  "Depression",
  "Bipolar Disorder",
  "Celiac Disease",
  "Inflammatory Bowel Disease (IBD)",
  "Polycystic Ovary Syndrome (PCOS)",
  "Sickle Cell Disease",
  "Blood Clotting Disorders"
];



const supplementUse = [
  "Vitamin D",
  "Vitamin B12",
  "Protein Powders",
  "Omega-3 Supplements",
  "Herbal Supplements",
  "Calcium",
  "Magnesium",
  "Probiotics",
  "Coenzyme Q10",
  "Multivitamin",
  "Zinc",
  "Iron",
  "Vitamin C",
  "Vitamin E",
  "Vitamin A",
  "Folic Acid",
  "Turmeric",
  "Green Tea Extract",
  "Collagen",
  "Glucosamine",
  "Chondroitin",
  "Resveratrol",
  "Creatine",
  "Ashwagandha",
  "Melatonin"
];

const substanceUse = [
  "Smoking",
  "Alcohol Consumption",
  "Cannabis Use",
  "Cocaine Use",
  "Heroin Use",
  "Methamphetamine Use",
  "Prescription Opioid Misuse",
  "Benzodiazepine Misuse",
  "Inhalant Use",
  "Hallucinogen Use",
  "Nicotine Dependence",
  "Vaping",
  "Synthetic Marijuana",
  "Ecstasy (MDMA) Use",
  "Kratom Use",
  "Amphetamine Use",
  "Anabolic Steroid Use",
  "Caffeine Overuse",
  "Prescription Stimulant Misuse",
  "PCP Use",
  "Salvia Divinorum Use",
  "Bath Salts Use"
];


const pastSurgeries = [
  "Bariatric Surgery",
  "Gastrointestinal Surgery",
  "Appendectomy",
  "Significant Hospital Stays",
  "Heart Bypass Surgery",
  "Angioplasty",
  "Joint Replacement Surgery",
  "Hernia Repair Surgery",
  "Gallbladder Removal",
  "Cesarean Section (C-Section)",
  "Tonsillectomy",
  "Hysterectomy",
  "Prostatectomy",
  "Kidney Transplant",
  "Liver Transplant",
  "Cataract Surgery",
  "Spinal Fusion Surgery",
  "Neurosurgery",
  "Breast Augmentation",
  "Mastectomy",
  "Colon Resection",
  "Liposuction",
  "Fracture Repair Surgery",
  "Pacemaker Implantation"
];


const nutritionalDeficiencies = [
  "Iron Deficiency",
  "Vitamin D Deficiency",
  "Calcium Deficiency",
  "Vitamin B12 Deficiency",
  "Vitamin C Deficiency",
  "Vitamin A Deficiency",
  "Vitamin E Deficiency",
  "Zinc Deficiency",
  "Magnesium Deficiency",
  "Iodine Deficiency",
  "Folate Deficiency",
  "Potassium Deficiency",
  "Vitamin K Deficiency",
  "Copper Deficiency",
  "Selenium Deficiency",
  "Chromium Deficiency",
  "Manganese Deficiency",
  "Essential Fatty Acid Deficiency",
  "Protein Deficiency",
  "Fiber Deficiency",
  "Phosphorus Deficiency",
  "Vitamin B6 Deficiency",
  "Niacin Deficiency"
];


export default function HealthForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HealthFormData>({
    resolver: zodResolver(healthFormSchema),
  });

  const onSubmit = async (data: HealthFormData) => {
    try {
      const res = await fetch("/api/auth/healthinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/rankingeek/lifestyleinfo");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  return (
    <div className="min-h-screen font-serif bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 flex items-center justify-center p-4">
    <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
        Health Information
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Health Condition */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Health Condition:
            </label>
            <input
              type="text"
              placeholder="Enter health condition"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("healthCondition")}
              list="healthConditionsOptions"
            />
            <datalist id="healthConditionsOptions">
              {healthConditions.map((condition, index) => (
                <option key={index} value={condition}/>
              ))}
            </datalist>
            {errors.healthCondition && (
              <p className="text-red-500 text-sm">
                {errors.healthCondition.message}
              </p>
            )}
          </div>
  
          {/* Medications Affecting Diet */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Medications Affecting Diet:
            </label>
            <input
              type="text"
              placeholder="Enter medication"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("medication")}
              list="medicationsAffectingDietOptions"
            />
            <datalist id="medicationsAffectingDietOptions">
              {medicationsAffectingDiet.map((medication, index) => (
                <option key={index} value={medication} />
              ))}
            </datalist>
            {errors.medication && (
              <p className="text-red-500 text-sm">
                {errors.medication.message}
              </p>
            )}
          </div>
  
          {/* Allergy */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Allergy:
            </label>
            <input
              type="text"
              placeholder="Enter allergy"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("allergy")}
              list="allergiesOptions"
            />
            <datalist id="allergiesOptions">
              {allergies.map((allergy, index) => (
                <option key={index} value={allergy} />
              ))}
            </datalist>
            {errors.allergy && (
              <p className="text-red-500 text-sm">
                {errors.allergy.message}
              </p>
            )}
          </div>
  
          {/* Dietary Preference */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Dietary Preference:
            </label>
            <input
              type="text" 
              placeholder="Enter dietary preference"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("dietaryPreference")}
              list="dietaryPreferencesOptions"
            />
            <datalist id="dietaryPreferencesOptions">
              {dietaryPreferences.map((preference, index) => (
                <option key={index} value={preference} />
              ))}
            </datalist>
            {errors.dietaryPreference && (
              <p className="text-red-500 text-sm">
                {errors.dietaryPreference.message}
              </p>
            )}
          </div>
  
          {/* Family Medical History */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Family Medical History:
            </label>
            <input
              type="text"
              placeholder="Enter family medical history"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("familyMedicalHistory")}
              list="familyMedicalHistoryOptions"
            />
            <datalist id="familyMedicalHistoryOptions">
              {familyMedicalHistory.map((history, index) => (
                <option key={index} value={history} />
              ))}
            </datalist>
            {errors.familyMedicalHistory && (
              <p className="text-red-500 text-sm">
                {errors.familyMedicalHistory.message}
              </p>
            )}
          </div>
  
          {/* Supplement Use */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Supplement Use:
            </label>
            <input
              type="text"
              placeholder="Enter supplement use"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("supplement")}
              list="supplementUseOptions"
            />
            <datalist id="supplementUseOptions">
              {supplementUse.map((supplement, index) => (
                <option key={index} value={supplement} />
              ))}
            </datalist>
            {errors.supplement && (
              <p className="text-red-500 text-sm">
                {errors.supplement.message}
              </p>
            )}
          </div>
  
          {/* Substance Use */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Substance Use:
            </label>
            <input
              type="text"
              placeholder="Enter substance use"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("substance")}
              list="substanceUseOptions"
            />
            <datalist id="substanceUseOptions">
              {substanceUse.map((substance, index) => (
                <option key={index} value={substance} />
              ))}
            </datalist>
            {errors.substance && (
              <p className="text-red-500 text-sm">
                {errors.substance.message}
              </p>
            )}
          </div>
  
          {/* Past Surgery */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Past Surgery:
            </label>
            <input
              type="text"
              placeholder="Enter past surgery"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("surgery")}
              list="pastSurgeriesOptions"
            />
            <datalist id="pastSurgeriesOptions">
              {pastSurgeries.map((surgery, index) => (
                <option key={index} value={surgery} />
              ))}
            </datalist>
            {errors.surgery && (
              <p className="text-red-500 text-sm">
                {errors.surgery.message}
              </p>
            )}
          </div>
  
          {/* Nutritional Deficiency */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Nutritional Deficiency:
            </label>
            <input
              type="text"
              placeholder="Enter nutritional deficiency"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("nutritionalDeficiency")}
              list="nutritionalDeficienciesOptions"
            />
            <datalist id="nutritionalDeficienciesOptions">
              {nutritionalDeficiencies.map((deficiency, index) => (
                <option key={index} value={deficiency} />
              ))}
            </datalist>
            {errors.nutritionalDeficiency && (
              <p className="text-red-500 text-sm">
                {errors.nutritionalDeficiency.message}
              </p>
            )}
          </div>
        </div>
         
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="shadow-lg px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 bg-green-500 text-white rounded-full text-[16px] sm:text-[20px] md:text-[20px] sm:font-bold md:font-bold font-medium w-[90%] sm:w-[250px] md:w-[300px] transition-transform duration-300 transform hover:scale-105"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}

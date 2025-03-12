import type { NextApiRequest, NextApiResponse } from "next";

// Helper function to check if a value is empty (works for arrays, objects, and strings)
function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object" && value !== null) {
    return Object.keys(value).length === 0;  
  }
  if (typeof value === "string") {
    return value.trim() === "";  
  }
  return !value;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" }); 
  }

  const {
    signupAdmin,
    lifestyleData,
    dietaryPreferenceData,
    nutritionalDeficiencyData,
    eatingHabitsData,
    technicalDetailsData,
    basicsdemographics,
  } = req.body;

  // Extract the payload from the request body
  const payload = req.body;

  // -------------------- UPDATED SYSTEM PROMPT WITH STRICT RESTRICTIONS --------------------
  const systemPrompt = `You are a nutrition expert. Using only the data provided by the user's form, generate three distinct weekly meal plan options for an adult. The meal plan MUST adhere strictly to the following conditions:

Dietary Preference:
If the user selects "vegetarian" in the Dietary Preference section, generate a 100% fully vegetarian diet plan.
If the user selects "non-veg," generate a non-vegetarian diet plan.
Important Restriction: Regardless of the above, the meal plan must use only the following ingredients: green vegetables (all available names of green vegetables), pulses, milk, fruits , paneer, and recipes for green vegetable salad (salads composed exclusively of green vegetables) and paneer recipes (paneer-based dishes) and also give the  Paratha recipes .and do not give any recipe that contains avocado , almond, oily food , masala, Fast food.
Important Strictly Restriction No Repetition in option1, option2, option3 :
Each meal option (for breakfast, lunch, evening meal, and snacks) must be unique within each weekly plan. Do not repeat any recipe or option no recipe appears again in a different day or meal category. 
Geographical Specificity: 

The meal plan must be tailored exclusively to the country and state provided by the user.
Only include dietary suggestions and recipes that are relevant to the specified country and state. Do not include any diet suggestions from any other geographical regions.  
Strict Adherence:

Do not include any diet suggestions that deviate from the data provided by the user.
Use only the input from the user’s form for crafting the meal plan.

Follow these instructions for each option:
1. Create a meal plan table for Breakfast, Lunch, Evening Meal, and Snacks for each day of the week (Monday to Sunday).
2. Provide a nutritional summary table with these columns: Energy (kcal), Saturated Fat (total % energy), Total Carbohydrates (inc. fibre, % energy), Calcium (mg), Iron (mg), Salt (g), and Fruit & Veg (portions).
3. Include sections titled "TO NOTE", "TOP TIPS", "What about FREE SUGARS?" and "What about FIBRE?".
Return your response in **valid JSON** format with the following structure: 

{
    "mealPlanOptions": [
  {
    "mealPlanTable": {
      "Breakfast": {
        "Monday": "...",
        "Tuesday": "...",
        "Wednesday": "...",
        "Thursday": "...",
        "Friday": "...",
        "Saturday": "...",
        "Sunday": "..."
      },
      "Lunch": {
        ...
      },
      "Evening Meal": {
        ...
      },
      "Snacks": {
        ...
      }
    },
    "nutritionalSummary": {
      "energy": "2000 kcal",
      "saturatedFat": "10%",
      "totalCarbohydrates": "55%",
      "calcium": "1000 mg",
      "iron": "18 mg",
      "salt": "5 g",
      "fruitVeg": "5 portions"
    },
    "toNote": [],
    "topTips": [],
    "freeSugars": [],
    "fibre": []
  },
  {
    ... // Second meal plan option
  },
  {
    ... // Third meal plan option
  }
]
}


Health Information: ${JSON.stringify(signupAdmin, null, 2)}
Lifestyle Information: ${JSON.stringify(lifestyleData, null, 2)}
Dietary Preference: ${JSON.stringify(dietaryPreferenceData, null, 2)}
Nutritional Deficiency: ${JSON.stringify(nutritionalDeficiencyData, null, 2)}
Eating Habits: ${JSON.stringify(eatingHabitsData, null, 2)}
Technical Details: ${JSON.stringify(technicalDetailsData, null, 2)}
Basics Demographics: ${JSON.stringify(basicsdemographics, null, 2)}
`;

  // Include the user data in the prompt
  const userPrompt = `Data: ${JSON.stringify(payload)}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The API key is stored in an environment variable for security
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
       
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", await response.text());
      return res.status(500).json({ error: "Failed to generate meal plan" });
    }

    const data = await response.json();
    const messageContent = data.choices[0].message.content;

    // Parse the JSON response from ChatGPT and send it back to the client
    res.status(200).json(JSON.parse(messageContent));
  } catch (error) {
    console.error("Error in generateMealPlan API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;








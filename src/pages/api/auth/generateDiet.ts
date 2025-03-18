import type { NextApiRequest, NextApiResponse } from "next";
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

  // -------------------- UPDATED SYSTEM PROMPT WITH STRICT RESTRICTIONS, NO REPETITION, AND UNIQUE LIVE AMAZON/FLIPKART LINKS --------------------
  const systemPrompt = `You are a nutrition expert. Using only the data provided by the user's form, generate three distinct weekly meal plan options for an adult. The meal plan MUST adhere strictly to the following conditions:

1. Dietary Preference:
   - If the user selects "vegetarian" in the Dietary Preference section, generate a 100% fully vegetarian diet plan.
   - If the user selects "non-veg," generate a non-vegetarian diet plan.
2. Important Ingredient Restriction:
   The meal plan must use only the following ingredients: green vegetables (all available names of green vegetables), pulses, milk, fruits, paneer, and recipes for green vegetable salad (salads composed exclusively of green vegetables), paneer recipes (paneer-based dishes), and Paratha recipes. Do not include any recipe that contains avocado, almond, oily food, masala, or fast food.
3. Important Strict Restriction - No Repetition:
   Each meal option (for Breakfast, Lunch, Evening Meal, and Snacks) must be unique within each weekly plan. No recipe or option should appear more than once across different days or meal categories.
4. Geographical Specificity:
   Tailor the meal plan exclusively to the country and state provided by the user. Only include dietary suggestions and recipes that are relevant to that geographical region. Do not include any diet suggestions from any other regions.
5. Unique External Link Requirement:
   For each diet option, under each meal option, include a unique external link that points to a live webpage on Amazon or Flipkart where the user can buy the products related to that recipe. Each link must be different and working. For example:
     - For Diet Option 1’s breakfast on Monday, use "https://www.amazon.in/s?k=gym+diet+breakfast+monday"
     - For Tuesday’s breakfast use "https://www.flipkart.com/search?q=gym+diet+breakfast+tuesday"
     - For Monday’s lunch use "https://www.amazon.in/s?k=gym+diet+lunch+monday", etc.
   These links should resemble pages where users can order the relevant gym diet products (similar to how one orders food on Swiggy or Zomato).
6. Strict Adherence:
   Do not include any diet suggestions or recipes that deviate from the data provided by the user. Use only the input from the user’s form for crafting the meal plan.
Follow these instructions for each option:
a. Create a meal plan table for Breakfast, Lunch, Evening Meal, and Snacks for each day of the week (Monday to Sunday). For each meal option, include a "recipe" field (the dish name and a brief description) and a "link" field with the unique external URL.
b. Provide a nutritional summary table with the following columns (using constant values):
   - Energy: "2000 kcal"
   - Saturated Fat (total % energy): "10%"
   - Total Carbohydrates (inc. fibre, % energy): "55%"
   - Calcium: "1000 mg"
   - Iron: "18 mg"
   - Salt: "5 g"
   - Fruit & Veg (portions): "5 portions"
c. Include sections titled "TO NOTE", "TOP TIPS", "What about FREE SUGARS?" and "What about FIBRE?".
Return your response in **valid JSON** format with the following structure:
{
  "mealPlanOptions": [
    {
      "mealPlanTable": {
        "Breakfast": {
          "Monday": { "recipe": "...", "link": "https://www.amazon.in/s?k=gym+diet+breakfast+monday" },
          "Tuesday": { "recipe": "...", "link": "https://www.flipkart.com/search?q=gym+diet+breakfast+tuesday" },
          "Wednesday": { "recipe": "...", "link": "https://www.amazon.in/s?k=gym+diet+breakfast+wednesday" },
          "Thursday": { "recipe": "...", "link": "https://www.flipkart.com/search?q=gym+diet+breakfast+thursday" },
          "Friday": { "recipe": "...", "link": "https://www.amazon.in/s?k=gym+diet+breakfast+friday" },
          "Saturday": { "recipe": "...", "link": "https://www.flipkart.com/search?q=gym+diet+breakfast+saturday" },
          "Sunday": { "recipe": "...", "link": "https://www.amazon.in/s?k=gym+diet+breakfast+sunday" }
        },
        "Lunch": {
          "Monday": { "recipe": "...", "link": "https://www.flipkart.com/search?q=gym+diet+lunch+monday" }
          // Similarly for other days...
        },
        "Evening Meal": {
          "Monday": { "recipe": "...", "link": "https://www.amazon.in/s?k=gym+diet+evening+monday" }
          // Similarly for other days...
        },
        "Snacks": {
          "Monday": { "recipe": "...", "link": "https://www.flipkart.com/search?q=gym+diet+snacks+monday" }
          // Similarly for other days...
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
      "toNote": [ /* unique notes */ ],
      "topTips": [ /* unique top tips */ ],
      "freeSugars": [ /* unique free sugars guidelines */ ],
      "fibre": [ /* unique fibre guidelines */ ]
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
        // Remove the backslash from the backtick here:
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
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
    res.status(200).json(JSON.parse(messageContent));

  } catch (error) {
    console.error("Error in generateMealPlan API:", error);
    res.status(500).json({error:"Internal server error"});
  }
};
export default handler;





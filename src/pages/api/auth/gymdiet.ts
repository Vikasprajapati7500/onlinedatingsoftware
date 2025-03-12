import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { age, gender, height, weight, activityLevel, healthGoal, workingHours, workType, mealPreference, dietaryRestrictions } = req.body;

  if (!age || !gender || !height || !weight || !activityLevel || !healthGoal || !workingHours || !workType || !mealPreference || !dietaryRestrictions) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEntry = await prisma.healthAssessment.create({
      data: {
        age,
        gender,
        height,
        weight,
        activityLevel,
        healthGoal,
        workingHours, // Must match the exact enum value in Prisma
        workType,
        mealPreference,
        dietaryRestrictions,
      },
    });

    return res.status(201).json(newEntry);
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


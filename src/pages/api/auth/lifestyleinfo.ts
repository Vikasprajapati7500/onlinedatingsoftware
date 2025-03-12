import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const {
    activitylevel,
    dailyRoutine,
    averageSleep,
    stressLevel,
    digitalUsage,
    recreational,
  } = req.body;

  // Basic validations to ensure all required fields are provided.
  if (!activitylevel || typeof activitylevel !== "string" || activitylevel.trim() === "") {
    return res.status(400).json({ message: "Activity level is required" });
  }
  if (!dailyRoutine || typeof dailyRoutine !== "string" || dailyRoutine.trim() === "") {
    return res.status(400).json({ message: "Daily routine is required" });
  }
  if (!averageSleep || typeof averageSleep !== "string" || averageSleep.trim() === "") {
    return res.status(400).json({ message: "Average sleep time is required" });
  }
  if (!stressLevel || typeof stressLevel !== "string" || stressLevel.trim() === "") {
    return res.status(400).json({ message: "Stress and Mental Wellbeing is required" });
  }
  if (!digitalUsage || typeof digitalUsage !== "string" || digitalUsage.trim() === "") {
    return res.status(400).json({ message: "Screen Time and Digital Device Usage is required" });
  }
  if (!recreational || typeof recreational !== "string" || recreational.trim() === "") {
    return res.status(400).json({ message: "Social and Recreational Activities is required" });
  }

  try {
    // Create a new Lifestyle record with the provided data.
    const lifestyle = await prisma.lifestyle.create({
      data: {
        activitylevel,
        dailyRoutine,
        averageSleep,
        stressLevel,
        digitalUsage,
        recreational,
      },
    });

    return res
      .status(201)
      .json({ message: "Lifestyle created successfully", lifestyle });
  } catch (error) {
    console.error("Error creating lifestyle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


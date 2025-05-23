import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST requests.
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  // Destructure the data from the request body using the same keys as sent by the client.
  const {
    eatingHabits,
    mealPreference,
    diningPreference,
        } = req.body;

  try {
    // Create a new healthinfo record using Prisma.
    const healthinfo = await prisma.eatinghabits .create({
      data: {
        eatingHabits,
        mealPreference,
        diningPreference,
      },
    });

    return res.status(201).json({ message: "Eating habits created successfully", healthinfo });
  } catch (error) {
    console.error("Error creating Eating habits:", error)
    return res.status(500).json({ message: "Internal server error" });
  }
}

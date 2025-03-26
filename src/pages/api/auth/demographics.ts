import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { age, gender, heightFt, heightIn, weight, country, state, dob} = req.body;

  if (!age || !gender  || !heightFt || !heightIn || !weight || !country || !state || !dob) {
    return res.status(400).json({ message: "All fields are required" });
  }

 try {
     const user = await prisma.demographics.create({
      data: {
        age,
        gender,
        heightFt,
        heightIn,
        weight,
        country,
        state,
        dob,
    },
});

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email,name,phone,countryCode} = req.body;

  if (!email || !name  || !phone || !countryCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  

  try {
    const user = await prisma.userinfo.create({
      data: {
        name,
        email,
        phone,
        countryCode,
     },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


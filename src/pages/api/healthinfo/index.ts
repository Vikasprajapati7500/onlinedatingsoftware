
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const users = await prisma.healthinfo.findMany({
        select: {
          id: true,
          healthCondition       :true,
          medication            :true,
          allergy               :true,
          dietaryPreference     :true,
          familyMedicalHistory  :true,
          supplement            :true,
          substance             :true,
          surgery               :true,
          nutritionalDeficiency :true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } 
}






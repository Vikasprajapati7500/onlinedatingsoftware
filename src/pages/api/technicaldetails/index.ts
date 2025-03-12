import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const users = await prisma.technicaldetails.findMany({
        select: {
          id:true,
          foodPortions:true,
          cookingFacilities:true,
          kitchenAppliances:true,
          cookingSkills:true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } 
}






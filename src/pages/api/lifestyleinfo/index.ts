
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//        const { userId } = req.query;
//       const users = await prisma.lifestyle.findMany({
//         where: { userId: Number(userId) }
//         select: {
         
//           id: true,
//           activitylevel:true,
//           dailyRoutine :true,
//           averageSleep :true,
//           stressLevel  :true,
//           digitalUsage :true,
//           recreational :true,
//         },
//       });
//       res.status(200).json(users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } 
// }


import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      
      const users = await prisma.lifestyle.findMany({
      
        select: {
          id: true,
          activitylevel: true,
          dailyRoutine: true,
          averageSleep: true,
          stressLevel: true,
          digitalUsage: true,
          recreational: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}




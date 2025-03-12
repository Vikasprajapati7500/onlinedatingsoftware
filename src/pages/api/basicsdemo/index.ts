import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await prisma.demographics.findMany({
                select: {
                    id:true,
                    age:true,
                    gender:true,
                    heightFt:true,
                    heightIn:true,
                    weight:true,
                    country:true,
                    state:true,
                },
            });
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}



// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//       const { userId } = req.query;
//       if (!userId) {
//         return res.status(400).json({ message: "Missing user id" });
//       }
      
//       // Ensure id is a string even if it's an array
//       const idString = Array.isArray(userId) ? userId[0] : userId;
      
//       const user = await prisma.demographics.findUnique({
//         where: { userId: idString },
//         select: {
//           id: true,
//           age: true,
//           gender: true,
//           heightFt: true,
//           heightIn: true,
//           weight: true,
//           country: true,
//           state: true,
//         },
//       });

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
      
//       res.status(200).json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }



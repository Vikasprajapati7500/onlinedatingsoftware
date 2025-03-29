import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

// Handle password reset request
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, newPassword } = request.body; // Using request.body instead of request.json()

    // Basic validation for email and password
    if (!email || !newPassword) {
      return response.status(400).json({ message: "Missing email or password" });
    }

    // Check if the email is a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ message: "Invalid email address" });
    }

    // Ensure the password has at least 3 characters
    if (newPassword.length < 3) {
      return response.status(400).json({});
    }

    // Check if the user exists in the database
    const user = await prisma.userinfo.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.userinfo.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Return success response
    return response.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export default handler;

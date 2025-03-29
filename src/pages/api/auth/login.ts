
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' })
  }

  try {
    // Query the user by email, assuming email is unique
    const user = await prisma.userinfo.findUnique({
      where: { email },  // Using the unique email field for querying
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Compare password with hashed password
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Respond with a success message if login is successful
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

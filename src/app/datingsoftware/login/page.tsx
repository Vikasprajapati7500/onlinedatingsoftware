"use client"
import { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  // States for forgot password form
  const [fpEmail, setFpEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Define Zod validation schema for login
  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(3,),
  })

  // Define Zod validation schema for forgot password
  const forgotPasswordSchema = z
    .object({
      email: z.string().email('Invalid email address'),
      newPassword: z.string().min(3),
      confirmPassword: z.string().min(3),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate input using Zod for login
    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      setError(result.error.errors.map(e => e.message).join(', '))
      setLoading(false)
      return
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.status === 200) {
      alert('Login successful!')
    } else {
      setError(data.message || 'Something went wrong')
    }

    setLoading(false)
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate input using Zod for forgot password
    const result = forgotPasswordSchema.safeParse({
      email: fpEmail,
      newPassword,
      confirmPassword,
    })
    if (!result.success) {
      setError(result.error.errors.map(e => e.message).join(', '))
      setLoading(false)
      return
    }

    const res = await fetch('/api/auth/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: fpEmail, newPassword }),
    })

    const data = await res.json()

    if (res.status === 200) {
      alert('Password reset successful!')
      // Optionally redirect to login or auto-fill login email
      setIsForgotPassword(false)
      setEmail(fpEmail)
    } else {
      setError(data.message || 'Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 font-serif">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-4">
        {isForgotPassword ? (
          <>
            <h1 className="text-2xl font-bold text-center text-green-500">Reset Password</h1>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="fp-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="fp-email"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="vk1738@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white p-3 rounded-full shadow-md text-lg font-bold outline-none"
              >
                {loading ? 'Updating...' : 'Reset Password'}
              </button>
              <div className="text-blue-500 text-center cursor-pointer" onClick={() => { setIsForgotPassword(false); setError(''); }}>
                Back to Login
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-green-500">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="vk1738@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="12345789"
                />
              </div>
              <div className="text-blue-500 cursor-pointer" onClick={() => { setIsForgotPassword(true); setError(''); }}>
                Forgot password?
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white p-3 rounded-full shadow-md text-lg font-bold outline-none"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div>
                Don't have account?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/datingsoftware/registration")}>
                  Signup
                </span>
              </div>
            </form>
          </>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  )
}
export default LoginForm







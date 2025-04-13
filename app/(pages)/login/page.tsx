'use client'

import { useState, useEffect } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/app/context/auth.context'
import Loading from '@/app/components/Loading/loading'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated, loginWithGoogle, login } = useAuth()

  // Handle access_token when component mounts
  useEffect(() => {
    const handleAccessToken = async () => {
      const accessToken = searchParams.get('access_token')
      console.log(accessToken)
      
      if (accessToken) {
        try {
          await loginWithGoogle(accessToken)
        } catch (err) {
          setError('Google login failed')
        }
      } else if (isAuthenticated) {
        redirect('/')
      }
      
      setIsLoading(false)
    }

    handleAccessToken()
  }, [searchParams, router])

  const handleEmailLogin = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
    } catch (err) {
      setError('Login failed. Please check your email and password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    redirect("https://hcmutssps.id.vn/auth/login")
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl text-gray-900 font-semibold">
            Sign In
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            {isLoading ? 'Processing...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or sign in with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </button>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register now
          </Link>
        </p>
      </div>
    </div>
  )
}
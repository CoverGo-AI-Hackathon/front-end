'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '../interface/IUser'
import { info } from '../repositories/user.api'
import Cookies from 'js-cookie' 

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (access_token: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void  // Add this line
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: () => {},
  setUser: (User) => {}
})

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token')
        if (!token) {
          setIsLoading(false)
          return
        }

        const userData = await info(token)
        console.log(userData)
        if (userData) {
          setUser(userData),
          setIsAuthenticated(true)
        }
        else {
          Cookies.remove("token")
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://hcmutssps.id.vn/auth/loginWithEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }
      const { respond } = await response.json()
      const userData: User | boolean | undefined = await info(respond)
      if (userData) {
        setUser(userData)
        Cookies.set('token', respond, {
          expires: 30, // 30 days
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        })
        setIsAuthenticated(true)
        router.replace('/')
      }   
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const loginWithGoogle = async (access_token: string) => {
    try {
      const userData = await info(access_token)
      if (userData) {
        setUser(userData)
        // Lưu token vào cookie
        Cookies.set('token', access_token, {
          expires: 30,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        })
        setIsAuthenticated(true)
        router.replace('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    setIsAuthenticated(false)
    router.replace('/login')
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    loginWithGoogle,
    setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
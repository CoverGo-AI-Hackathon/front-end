'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/auth.context'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const menuItems = [
    { label: 'Consultation', href: '/chat' },
    { label: 'About', href: '/about' },
  ]
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"  // Add your logo path here
              alt="Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Account Button */}
            {isAuthenticated?(
              <button
              onClick={() => router.push('/auth')}
              className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src={user?.picture || "/default-avatar.png"}
                alt="User avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
            ):(
              <>
              </>
            )}
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated?(
              <button
              onClick={() => router.push('/auth')}
              className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src={user?.picture || "/default-avatar.png"}
                alt="User avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
            ):(
              <>
              </>
            )}
            
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
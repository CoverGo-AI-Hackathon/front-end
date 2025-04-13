'use client'

import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const contactInfo = {
    address: '123 Street Name, City, Country',
    email: 'contact@company.com',
    phone: '+84 123 456 789'
  }

  const partners = [
    { name: 'Partner 1', logo: '/partners/partner1.svg' },
    { name: 'Partner 2', logo: '/partners/partner2.svg' },
    { name: 'Partner 3', logo: '/partners/partner3.svg' }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Company Logo"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <p className="text-sm">
              Providing innovative solutions for your business needs
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <LocationIcon className="w-5 h-5" />
                <span>{contactInfo.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <EmailIcon className="w-5 h-5" />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </p>
              <p className="flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5" />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </p>
            </div>
          </div>

          {/* Partners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Partners</h3>
            <div className="grid grid-cols-3 gap-4">
              {partners.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={60}
                    height={60}
                    className="rounded bg-white p-2"
                  />
                  <span className="text-xs mt-1">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Simple icon components
const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

export default Footer
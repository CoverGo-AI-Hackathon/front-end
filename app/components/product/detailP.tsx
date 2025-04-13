import Image from 'next/image'
import Link from 'next/link'
import { InsurancePackage } from './interface'
import { motion } from 'framer-motion'

interface InsuranceCardProps {
  package: InsurancePackage
}

export default function InsuranceCard({ package: pkg }: InsuranceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="h-48 relative group items-center flex justify-center">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="object-cover transform group-hover:scale-110 transition-transform duration-500 items-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <motion.div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
          >
            {pkg.type}
          </motion.span>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Target Audience:</h4>
          <div className="flex flex-wrap gap-2">
            {pkg.targetAudience.map((audience, index) => (
              <motion.span 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {audience}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Insurance Benefits:</h4>
          <ul className="space-y-3">
            {Object.entries(pkg.coverage).map(([key, value]) => (
              <motion.li 
                key={key}
                whileHover={{ x: 5 }}
                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="font-semibold text-blue-600">{value}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Monthly Premium by Age:</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { age: '18-39', premium: pkg.monthlyPremiumHKD.age18 },
              { age: '40-64', premium: pkg.monthlyPremiumHKD.age40 },
              { age: '65+', premium: pkg.monthlyPremiumHKD.age65 },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="text-sm text-gray-600 mb-1">{item.age}</div>
                <div className="font-bold text-blue-700">{item.premium} HKD</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Benefits', items: pkg.features, colorClass: 'green' },
            { title: 'Limitations', items: pkg.limitations, colorClass: 'red' },
          ].map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-500">{section.title}:</h4>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 bg-${section.colorClass}-50 text-${section.colorClass}-700 rounded-full text-sm font-medium`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Link
              href={`/insurance/${pkg.id}`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Details
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('/consultation', '_blank')}
            className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-colors font-semibold cursor-pointer"
          >
            Consultation
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
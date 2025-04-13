'use client'

import { useState } from 'react'
import Hero from '@/app/components/product/listP'
import InsuranceCard from '@/app/components/product/detailP'
import Pagination from '@/app/components/product/pagation'
import { InsurancePackage } from '@/app/components/product/interface'

const insurancePackages: InsurancePackage[] = [
  {
    "id": "vhis_standard_00",
    "image": "https://cdn-icons-png.flaticon.com/128/1962/1962589.png",
    "name": "VHIS Standard Basic",
    "type": "Standard",
    "targetAudience": ["individuals", "low budget", "students"],
    "coverage": {
      "hospitalization": "400 HKD/day",
      "surgical": "30,000 HKD/year",
      "prePostHospital": "2 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 120,
      "age40": 180,
      "age65": 290
    },
    "features": ["Basic and affordable", "Standard VHIS coverage"],
    "limitations": ["Low payout", "Limited participating hospitals"]
  },
  {
    "id": "vhis_standard_01",
    "image": "https://cdn-icons-png.flaticon.com/128/16568/16568284.png",
    "name": "VHIS Standard Plus",
    "type": "Standard",
    "targetAudience": ["first-time buyers", "young families"],
    "coverage": {
      "hospitalization": "600 HKD/day",
      "surgical": "50,000 HKD/year",
      "prePostHospital": "3 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 160,
      "age40": 220,
      "age65": 350
    },
    "features": ["Budget-friendly", "Stable payout"],
    "limitations": ["No private room included"]
  },
  {
    "id": "vhis_flexi_02",
    "image": "https://cdn-icons-png.flaticon.com/128/2966/2966334.png",
    "name": "VHIS Flexi Smart",
    "type": "Flexi",
    "targetAudience": ["families", "middle-income individuals"],
    "coverage": {
      "hospitalization": "1,000 HKD/day",
      "surgical": "100,000 HKD/year",
      "prePostHospital": "4 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 280,
      "age40": 400,
      "age65": 620
    },
    "features": ["Flexible benefits", "Affordable"],
    "limitations": ["No VIP room"]
  },
  {
    "id": "vhis_flexi_03",
    "image": "https://cdn-icons-png.flaticon.com/128/3600/3600682.png",
    "name": "VHIS Flexi Max",
    "type": "Flexi",
    "targetAudience": ["middle-aged", "those seeking better treatment"],
    "coverage": {
      "hospitalization": "1,500 HKD/day",
      "surgical": "200,000 HKD/year",
      "prePostHospital": "5 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 350,
      "age40": 500,
      "age65": 780
    },
    "features": ["Comprehensive protection", "Ideal for long-term treatment"],
    "limitations": ["No overseas treatment coverage"]
  },
  {
    "id": "vhis_flexi_premium_04",
    "image": "https://cdn-icons-png.flaticon.com/128/3188/3188097.png",
    "name": "VHIS Premium Care",
    "type": "Flexi Premium",
    "targetAudience": ["VIP clients", "those with pre-existing conditions"],
    "coverage": {
      "hospitalization": "Full coverage",
      "surgical": "500,000 HKD/year",
      "prePostHospital": "Unlimited visits",
      "prescribedMedication": true,
    },
    "monthlyPremiumHKD": {
      "age18": 600,
      "age40": 880,
      "age65": 1300
    },
    "features": ["Private room", "Full hospital expense coverage"],
    "limitations": ["High cost", "Mandatory health check"]
  },
  {
    "id": "vhis_family_05",
    "name": "VHIS Family Essential",
    "image": "https://cdn-icons-png.flaticon.com/128/6512/6512351.png",
    "type": "Flexi",
    "targetAudience": ["families with young children"],
    "coverage": {
      "hospitalization": "800 HKD/day",
      "surgical": "120,000 HKD/year",
      "prePostHospital": "4 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 260,
      "age40": 360,
      "age65": 600
    },
    "features": ["Optimized for children", "Reasonable cost"],
    "limitations": ["No private room"]
  },
  {
    "id": "vhis_elderly_06",
    "image": "https://cdn-icons-png.flaticon.com/128/2300/2300446.png",
    "name": "VHIS Senior Care",
    "type": "Standard",
    "targetAudience": ["elderly"],
    "coverage": {
      "hospitalization": "500 HKD/day",
      "surgical": "40,000 HKD/year",
      "prePostHospital": "2 visits",
      "prescribedMedication": false
    },
    "monthlyPremiumHKD": {
      "age18": 150,
      "age40": 210,
      "age65": 370
    },
    "features": ["Suitable for seniors", "Simple procedures"],
    "limitations": ["No coverage for prescribed medication", "Age restrictions"]
  },
  {
    "id": "vhis_child_07",
    "image": "https://cdn-icons-png.flaticon.com/128/7187/7187957.png",
    "name": "VHIS Kid Plus",
    "type": "Flexi",
    "targetAudience": ["children", "parents with young kids"],
    "coverage": {
      "hospitalization": "1,200 HKD/day",
      "surgical": "180,000 HKD/year",
      "prePostHospital": "5 visits",
      "prescribedMedication": true
    },
    "monthlyPremiumHKD": {
      "age18": 200,
      "age40": 320,
      "age65": 0
    },
    "features": ["Designed specifically for kids", "Covers medication and vaccinations"],
    "limitations": ["Not applicable to adults"]
  },
  {
    "id": "vhis_maternity_08",
    "image": "https://cdn-icons-png.flaticon.com/128/10334/10334311.png",
    "name": "VHIS Maternity Care",
    "type": "Flexi",
    "targetAudience": ["pregnant women", "young couples"],
    "coverage": {
      "hospitalization": "900 HKD/day",
      "surgical": "150,000 HKD/year",
      "prePostHospital": "6 visits",
      "prescribedMedication": true,
    },
    "monthlyPremiumHKD": {
      "age18": 380,
      "age40": 500,
      "age65": 0
    },
    "features": ["Maternity coverage", "C-section support"],
    "limitations": ["Only for females under 45"]
  },
  {
    "id": "vhis_global_9",
    "image": "https://cdn-icons-png.flaticon.com/128/10880/10880505.png",
    "name": "VHIS Global Health",
    "type": "Flexi Premium",
    "targetAudience": ["business travelers", "frequent flyers"],
    "coverage": {
      "hospitalization": "Worldwide",
      "surgical": "1,000,000 HKD/year",
      "prePostHospital": "Unlimited visits",
      "prescribedMedication": true,
    },
    "monthlyPremiumHKD": {
      "age18": 900,
      "age40": 1200,
      "age65": 1700
    },
    "features": ["International coverage", "Premium global treatment"],
    "limitations": ["Very high cost", "Detailed health declaration required"]
  }
]


export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const packagesPerPage = 3
  const totalPages = Math.ceil(insurancePackages.length / packagesPerPage)

  const displayedPackages = insurancePackages.slice(
    (currentPage - 1) * packagesPerPage,
    currentPage * packagesPerPage
  )

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="packages" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Insurance Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedPackages.map((pkg) => (
              <InsuranceCard key={pkg.id} package={pkg} />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </main>
  )
}
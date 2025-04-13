import { useRouter } from 'next/navigation';

export default function Hero() {
  const navigate = useRouter()
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Protect Your Future
        </h1>
        <p className="text-xl mb-8">
          Comprehensive insurance solutions for your peace of mind
        </p>
        <button 
          onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
        >
          View Insurance Packages
        </button>
        <button 
          onClick={() => navigate.push('/chat')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer ml-[20px]"
        >
          Get Consultation
        </button>
      </div>
    </section>
  )
}
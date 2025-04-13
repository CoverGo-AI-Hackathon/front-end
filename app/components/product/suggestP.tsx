import Image from 'next/image'
import { InsurancePackage } from './interface' 

interface ProductSuggestionsProps {
  products: InsurancePackage[]
}

export default function ProductSuggestions({ products }: ProductSuggestionsProps) {
  return (
    <div className="w-96 bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Suggested Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: InsurancePackage }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {product.targetAudience.join(', ')}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-sm font-medium">
              From {product.monthlyPremiumHKD.age18} HKD/month
            </span>
            <button className="text-sm text-blue-600 hover:underline">
              Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
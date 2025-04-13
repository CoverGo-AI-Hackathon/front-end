import { useState } from 'react';
import Image from 'next/image';
import { InsurancePackage } from './interface';
import DownloadSection from './downLoadP';

interface propsInput {
  suggestedProducts: {
    insurance: InsurancePackage,
    percent: number
  }[],
  DownloadFile: InsurancePackage[]
}

export default function InsuranceProductList({ suggestedProducts, DownloadFile } : propsInput ){
  const [hoveredProduct, setHoveredProduct] = useState<InsurancePackage | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (product: InsurancePackage, e: React.MouseEvent) => {
    setHoveredProduct(product);
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left - 350,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="relative">
      <h1 className='mt-[10px] ml-[30px] font-bold'>Recommended Products</h1>
      {hoveredProduct && (
        <div 
          className="fixed bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-80"
          style={{ 
            top: `${hoverPosition.y}px`, 
            left: `${hoverPosition.x}px`,
            zIndex: 100
          }}
        >
          <h3 className="text-xl font-bold mb-4">{hoveredProduct.name}</h3>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Coverage:</h4>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Hospitalization:</span> {hoveredProduct.coverage.hospitalization}</li>
              <li><span className="font-medium">Surgery:</span> {hoveredProduct.coverage.surgical}</li>
              <li><span className="font-medium">Pre/Post Hospital:</span> {hoveredProduct.coverage.prePostHospital}</li>
              <li><span className="font-medium">Prescribed Medicine:</span> {hoveredProduct.coverage.prescribedMedication ? 'Yes' : 'No'}</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Premium by Age:</h4>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Age 18:</span> {hoveredProduct.monthlyPremiumHKD.age18} HKD/month</li>
              <li><span className="font-medium">Age 40:</span> {hoveredProduct.monthlyPremiumHKD.age40} HKD/month</li>
              <li><span className="font-medium">Age 65:</span> {hoveredProduct.monthlyPremiumHKD.age65} HKD/month</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {hoveredProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Limitations:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {hoveredProduct.limitations.map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="w-96 bg-white p-4 overflow-y-auto">
        <div className="space-y-4">
          {suggestedProducts.map((product) => (
            <div
              key={product.insurance.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(product.insurance, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  {product.insurance.image ? (
                    <img
                      src={product.insurance.image}
                      alt={product.insurance.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span className="text-gray-600">{product.insurance.type}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.insurance.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.insurance.targetAudience.join(', ')}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      From {product.insurance.monthlyPremiumHKD.age18} HKD/month
                    </span>
                    <button className="text-sm text-blue-600 hover:underline cursor-pointer">
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DownloadSection files={DownloadFile} />
    </div>
  );
}
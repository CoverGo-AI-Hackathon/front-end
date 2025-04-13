import { InsurancePackage } from './interface'

interface DownloadSectionProps {
  files: InsurancePackage[]
}

export default function DownloadSection({ files }: DownloadSectionProps) {
  if (!files.length) return null;

  const generatePDF = (file: InsurancePackage) => {
    // Create content for the file
    const content = `
Bảo hiểm: ${file.name}
Loại: ${file.type}
Đối tượng: ${file.targetAudience.join(', ')}



Tính năng chính:
${file.features.map(f => `- ${f}`).join('\n')}
    `;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Document Insurance</h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <div className="flex-1">
              <h4 className="font-medium">{file.name}</h4>
              <p className="text-sm text-gray-500">Detail</p>
            </div>
            <button
              onClick={() => generatePDF(file)}
              className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Tải xuống
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
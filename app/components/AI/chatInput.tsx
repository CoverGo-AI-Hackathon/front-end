interface ChatInputProps {
  input: string
  loading: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

import { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

const data = [
  "VHIS Standard Basic",
  "hospitalization",
  "surgical coverage",
  "prePostHospital visits",
  "prescribedMedication",
  "monthlyPremiumHKD",
  "age18 premium",
  "age40 premium",
  "age65 premium",
  "low payout",
  "limited hospitals",
  "VHIS Standard Plus",
  "budget-friendly",
  "stable payout",
  "no private room",
  "VHIS Flexi Smart",
  "flexible benefits",
  "affordable",
  "families",
  "middle-income individuals",
  "1,000 HKD/day",
  "100,000 HKD/year",
  "4 visits",
  "no VIP room",
  "VHIS Flexi Max",
  "comprehensive protection",
  "long-term treatment",
  "1,500 HKD/day",
  "200,000 HKD/year",
  "5 visits",
  "no overseas treatment",
  "VHIS Premium Care",
  "VIP clients",
  "pre-existing conditions",
  "full coverage",
  "500,000 HKD/year",
  "unlimited visits",
  "private room",
  "high cost",
  "mandatory health check",
  "VHIS Family Essential",
  "families with young children",
  "optimized for children",
  "reasonable cost",
  "no private room",
  "VHIS Senior Care",
  "elderly",
  "simple procedures",
  "age restrictions",
  "no coverage for prescribed medication",
  "VHIS Kid Plus",
  "designed for kids",
  "medication and vaccinations",
  "not applicable to adults",
  "VHIS Maternity Care",
  "maternity support",
  "C-section support",
  "only for females under 45",
  "VHIS Global Health",
  "business travelers",
  "frequent flyers",
  "international coverage",
  "premium global treatment",
  "very high cost",
  "detailed health declaration required",
  "outpatient services",
  "mental health support",
  "annual deductible",
  "high deductible",
  "no deductible",
  "tax-deductible plan",
  "government certified",
  "room and board",
  "ICU coverage",
  "day surgery",
  "emergency treatment",
  "specialist consultation",
  "network hospitals",
  "non-network hospital",
  "emergency overseas treatment",
  "second medical opinion",
  "long-term illness",
  "chronic disease management",
  "reimbursement rate",
  "direct billing",
  "easy claims process",
  "telemedicine support",
  "post-discharge care",
  "physiotherapy",
  "Chinese medicine coverage",
  "cancer treatment",
  "chemotherapy",
  "radiotherapy",
  "dialysis treatment",
  "organ transplant",
  "health screening",
  "annual check-up",
  "vaccination coverage",
  "dental benefits",
  "vision benefits",
  "wellness program",
  "family discount",
  "couple plan",
  "senior discount",
  "lifetime coverage",
  "guaranteed renewal",
  "portable policy",
  "policy upgrade option",
  "customizable plan",
  "dedicated health advisor",
  "cashless facility",
  "waiting period",
  "coverage limit",
  "sub-limit",
  "co-payment",
  "policyholder",
  "beneficiary",
  "insured person",
  "premium waiver",
  "policy lapse",
  "grace period",
  "policy reinstatement",
  "medical inflation protection",
  "room upgrade option",
  "bilingual support",
  "24/7 hotline",
  "multilingual claims support",
  "AI-based claims system",
  "family coverage",
  "child-only plan",
  "no age limit",
  "critical illness add-on",
  "maternity rider",
  "accident rider",
  "terminal illness coverage",
  "lump-sum payout",
  "health coaching",
  "digital policy",
  "eco-friendly documents",
  "electronic health record integration",
  "fast approval",
  "paperless application",
  "mobile claims",
  "app-based access",
  "real-time status tracking",
  "flexible payment terms",
  "monthly billing",
  "yearly billing",
  "auto renewal",
  "claim rejection reasons",
  "exclusion list",
  "pre-authorization required",
  "companion coverage",
  "domestic helper coverage",
  "student health plan",
  "travel insurance bundle",
  "extended maternity leave support",
  "postnatal support",
  "senior mobility aids",
  "disability benefits",
  "rehabilitation care",
  "custom claim limits",
  "high claim ratio",
  "trusted brand",
  "ISO-certified provider"
]

export default function ChatInput({ input, loading, onInputChange, onSubmit }: ChatInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tìm từ khóa phù hợp khi input thay đổi
  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Get the last word after space
    const words = input.split(' ');
    const lastWord = words[words.length - 1].toLowerCase();

    // Only show suggestions if there's a last word
    if (lastWord) {
      const filtered = data
        .filter(item => item.toLowerCase().includes(lastWord))
        .slice(0, 5); // Giới hạn tối đa 5 gợi ý
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  // Đóng gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý phím mũi tên và Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const words = input.split(' ');
      words[words.length - 1] = suggestions[selectedIndex];
      onInputChange(words.join(' '));
      setShowSuggestions(false);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Chọn gợi ý khi click
  const handleSuggestionClick = (suggestion: string) => {
    const words = input.split(' ');
    words[words.length - 1] = suggestion;
    onInputChange(words.join(' '));
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} className="p-4 bg-white shadow-top relative">
      <div className="flex space-x-4 relative">
        <div className="flex-1 relative">
          {/* Suggestions dropdown - now positioned ABOVE the input */}
          {showSuggestions && (
            <div 
              ref={suggestionsRef}
              className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto cursor-pointer"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input.trim() !== '' && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Nhập câu hỏi của bạn..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          <BsFillSendFill/>
        </button>
      </div>
    </form>
  );
}
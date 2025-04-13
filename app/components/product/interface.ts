export interface Coverage {
  hospitalization: string;
  surgical: string;
  prePostHospital: string;
  prescribedMedication: boolean;
}

export interface MonthlyPremium {
  age18: number;
  age40: number;
  age65: number;
}

export interface InsurancePackage {
  image: string,
  id: string;
  name: string;
  type: string;
  targetAudience: string[];
  coverage: Coverage;
  monthlyPremiumHKD: MonthlyPremium;
  features: string[];
  limitations: string[];
}


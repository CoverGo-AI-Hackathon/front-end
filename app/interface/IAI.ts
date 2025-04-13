import { InsurancePackage } from "../components/product/interface"

export interface Chat {
  respond: {
    content: string
    isBot: boolean
  }[]
}

export interface Reply {
  respond: {
    reply: {
      botReply: string
      recommendedPlans: [{
        insurance: InsurancePackage,
        percent: number
      }]
      matchedPlans: [
        InsurancePackage
      ]
    }
  }
}
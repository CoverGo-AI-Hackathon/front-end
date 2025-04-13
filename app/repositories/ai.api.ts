
import { Chat, Reply } from "../interface/IAI";
import { ApiService } from "./root"; 

export const getMess = async (token: string) => {
  try {
    const data = await ApiService.get<Chat>('api/recent', {
      token: token
    })
    console.log("Mess", data)
    return data
  } catch (error: any) {
    console.log(error)
  }
}

export const ChatAI = async (token: string, message: string) => {
  try {
    const data = await ApiService.post<Reply>('api/chat', 
    {
      message: message
    },

      {
      token: token,
    })
    console.log("Data", data)
    return data   
  } catch (error: any) {
    console.log(error)
  }
}
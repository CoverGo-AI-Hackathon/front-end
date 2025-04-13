import { useAuth } from "@/app/context/auth.context"
import { Chat } from "@/app/interface/IAI"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface propInput {
  respond: {
    content: string
    isBot: boolean
  }[],
  isTyping: boolean
}

export default function Messages({ respond, isTyping }: propInput) {
  const { user } = useAuth()
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {respond.map((message, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 ${
            !message.isBot ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            {!message.isBot ? (
              <Image
                src={user?.picture || "/default-avatar.png"}
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <Image
                src="/ai-avatar.svg"
                alt="AI avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            )}
          </div>
          {/* Message bubble */}
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              !message.isBot
                ? 'bg-blue-600 text-white'
                : 'bg-white shadow'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      
      {/* Typing indicator */}
      {isTyping && (
        <div className="flex items-center gap-2 flex-row">
          {/* Bot Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/ai-avatar.svg"
              alt="AI avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          {/* Typing bubble */}
          <div className="max-w-[70%] rounded-lg p-3 bg-white shadow">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
import { useEffect, useRef, useState } from 'react'
import ChatInput from "@/app/components/AI/chatInput"
import Messages from "@/app/components/AI/messege"
import { Chat } from "@/app/interface/IAI"

interface propInput {
  messages: Chat | undefined,
  input: string,
  loading: boolean,
  setInput: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  isTyping: boolean // Add this new prop
}

export const Scroll = ({ messages, input, loading, setInput, handleSubmit, isTyping }: propInput) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]) // Scroll xuống mỗi khi messages thay đổi


  return (
    <div className="flex-1 flex flex-col bg-gray-100 border-r">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {messages ? (
          <Messages respond={messages?.respond} isTyping={isTyping} />
        ) : null}
      </div>

      <ChatInput
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import { InsurancePackage } from '@/app/components/product/interface'
import Image from 'next/image'
import ChatInput from '@/app/components/AI/chatInput'
import Messages from '@/app/components/AI/messege'
import { Message, MessagesProps } from './interface'
import { Chat } from '@/app/interface/IAI'
import { ChatAI, getMess } from '@/app/repositories/ai.api'
import Cookies from 'js-cookie'
import { message } from 'antd'
import { Scroll } from './scoll'
import InsuranceProductList from '@/app/components/product/hoverP'
import DownloadSection from '@/app/components/product/downLoadP'

export default function ChatPage() {
  const [messages, setMessages] = useState<Chat>()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  // Fetch previous messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      try {
        const token = Cookies.get('token');
        if (token) {
          const data: Chat | undefined = await getMess(token)
          if (data) {
            data.respond.push(
              {
                content: 'Hello! How can I help you with insurance today?',
                isBot: true
              }
            )
            setMessages(data)
          }
        }
        else {
          setMessages({
            respond: [{
              content: 'Hello! How can I help you with insurance today?',
              isBot: true
            }]
          })
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error)
        // Set default message on error
        setMessages({
          respond: [{
            content: 'Hello! How can I help you with insurance today?',
            isBot: true
          }]
        })
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])
  
  const [suggestedProducts, setSuggestedProducts] = useState<{
    insurance: InsurancePackage,
    percent: number
  }[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('suggestedProducts')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  const [downLoadFile, setDownLoadFile] = useState<InsurancePackage[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('downloadFiles')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  // Update localStorage when suggestedProducts changes
  useEffect(() => {
    if (suggestedProducts.length > 0) {
      localStorage.setItem('suggestedProducts', JSON.stringify(suggestedProducts))
    }
  }, [suggestedProducts])

  // Update localStorage when downLoadFile changes
  useEffect(() => {
    if (downLoadFile.length > 0) {
      localStorage.setItem('downloadFiles', JSON.stringify(downLoadFile))
    }
  }, [downLoadFile])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    // Add user message immediately
    setMessages(prevMessages => {
      if (prevMessages) {
        return {
          respond: [
            ...prevMessages.respond,
            { 
              content: input,
              isBot: false
            }
          ]
        }
      } else {
        return {
          respond: [
            {
              content: input,
              isBot: false
            }
          ]
        }
      }
    })
    setInput('')
    // Show typing indicator
    setIsTyping(true)
    setLoading(true)
    
    try {
      const token = Cookies.get("token")
      if (token) {
        const data = await ChatAI(token, input)
        if (data) {
          // Update suggested products and localStorage
          const newSuggestions = data.respond.reply.recommendedPlans
          setSuggestedProducts(newSuggestions)
          localStorage.setItem('suggestedProducts', JSON.stringify(newSuggestions))
          
          // Update download files and localStorage
          const newDownloadFiles = data.respond.reply.matchedPlans
          setDownLoadFile(newDownloadFiles)
          localStorage.setItem('downloadFiles', JSON.stringify(newDownloadFiles))
          
          // Remove typing indicator and add actual response
          setIsTyping(false)
          setMessages(prevMessages => {
            if (prevMessages) {
              return {
                respond: [
                  ...prevMessages.respond,
                  {
                    content: data.respond.reply.botReply,
                    isBot: true
                  }
                ]
              }
            } else {
              return {
                respond: [
                  {
                    content: input,
                    isBot: false
                  }, 
                  {
                    content: data.respond.reply.botReply,
                    isBot: true
                  }
                ]
              }
            }
          })
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      
      // Remove typing indicator and add error message
      setIsTyping(false)
      setMessages(prevMessages => {
        if (prevMessages) {
          return {
            respond: [
              ...prevMessages.respond,
              {
                content: "Sorry, an error occurred. Please try again later.",
                isBot: true
              }
            ]
          }
        } else {
          return {
            respond: [
              {
                content: input,
                isBot: false
              },
              {
                content: "Sorry, an error occurred. Please try again later.",
                isBot: true
              }
            ]
          }
        }
      })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex h-[600px]">
      {/* Chat Section */}
      <Scroll 
        messages={messages} 
        input={input} 
        handleSubmit={handleSubmit} 
        loading={loading} 
        setInput={setInput}
        isTyping={isTyping} // Pass the typing state to Scroll component
      />
      {/* Product Suggestions */}
      <InsuranceProductList suggestedProducts={suggestedProducts} DownloadFile={downLoadFile} />
    </div>
  )
}
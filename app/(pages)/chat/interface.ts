export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface MessagesProps {
  messages: Message[]
  loading: boolean
}

export interface ChatInputProps {
  input: string
  loading: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}
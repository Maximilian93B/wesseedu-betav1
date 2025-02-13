import { useState } from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, action }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((toasts) => [...toasts, { id, title, description, action }])
  }

  const dismiss = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }

  return { toast, dismiss, toasts }
}

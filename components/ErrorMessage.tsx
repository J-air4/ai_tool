"use client"

import { AlertCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface ErrorMessageProps {
  message: string
  type?: "error" | "warning"
}

export function ErrorMessage({ message, type = "error" }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded-md ${
        type === "error" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
      } mt-2`}
      role="alert"
    >
      {type === "error" ? (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <span className="text-sm flex-grow">{message}</span>
      <XCircle className="h-5 w-5 flex-shrink-0 cursor-pointer" onClick={() => setIsVisible(false)} />
    </div>
  )
}


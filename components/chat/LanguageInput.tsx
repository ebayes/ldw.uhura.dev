"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface LanguageInputProps {
  onLanguageChange: (language: string) => void;
  initialValue?: string;
  width?: string;
}

export function LanguageInput({ 
  onLanguageChange, 
  initialValue = "",
  width = "150px"
}: LanguageInputProps) {
  const [value, setValue] = React.useState(initialValue)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    onLanguageChange(newValue)
  }

  return (
    <Input
      type="text"
      placeholder="Enter language..."
      value={value}
      onChange={handleInputChange}
      className={`font-mono text-xs ${width}`}
    />
  )
}
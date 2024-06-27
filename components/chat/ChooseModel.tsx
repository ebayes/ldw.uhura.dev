"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { models, languages } from "@/data/models"

interface ChooseModelProps {
  models?: typeof models | typeof languages;
  onModelChange?: (model: string) => void;
  value?: string;
  icon?: boolean;
  width?: string;
}

export function ChooseModel({ 
  models: providedModels = models, 
  onModelChange, 
  value: initialValue,
  icon = true,
  width = "280px"
}: ChooseModelProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialValue || "gpt-4-turbo")

  const availableModels = providedModels && providedModels.length > 0 ? providedModels : models

  const handleModelChange = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (onModelChange) {
      onModelChange(currentValue);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${width} justify-between font-mono text-xs`}
        >
          {value ? (
            <>
              <div className="flex items-center">
                {icon && 'icon' in availableModels[0] && (
                  <Image
                    src={(availableModels.find((model) => model.value === value) as any)?.icon || ''}
                    alt=""
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                )}
                {availableModels.find((model) => model.value === value)?.label}
              </div>
            </>
          ) : (
            icon ? "Choose model..." : "Choose language..."
          )}
          
          <ChevronDownIcon className="h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${width} p-0`}>
        <Command>
          <CommandInput className="font-mono text-xs" placeholder="Search model..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {availableModels.map((model) => (
                <CommandItem
                  key={model.value}
                  className="font-mono text-xs"
                  value={model.value}
                  onSelect={handleModelChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === model.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {icon && 'icon' in model && (
                    <Image src={(model as any).icon} alt={model.label} width={16} height={16} className="mr-2" />
                  )}
                  {model.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
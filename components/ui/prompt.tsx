import * as React from "react"
import { SendHorizontal } from "lucide-react" 

import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface PromptProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  const Prompt = React.forwardRef<HTMLInputElement, PromptProps>(
    ({ className, type, ...props }, ref) => {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              "text-sm placeholder:text-muted-foreground flex md:w-[700px] lg:w-[700px] w-[400px] rounded-full border bg-transparent px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              className
            )}
            ref={ref}
            {...props}
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-[22px] top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
          >
            <SendHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      )
    }
  )
Prompt.displayName = "Prompt"

export { Prompt }

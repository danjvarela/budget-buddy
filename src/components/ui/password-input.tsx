import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [shown, setShown] = useState(false)

    return (
      <div className="relative flex items-center space-x-2">
        <Input
          className={cn("pr-12", className)}
          type={shown ? "text" : "password"}
          ref={ref}
          {...props}
        />
        <Button
          variant="ghost"
          onClick={() => setShown((prev) => !prev)}
          type="button"
          className="absolute right-2 h-8 w-8 rounded-full p-0"
        >
          {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

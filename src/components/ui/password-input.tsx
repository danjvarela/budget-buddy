import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [shown, setShown] = useState(false)

    return (
      <div className="flex items-center space-x-2">
        <Input type={shown ? "text" : "password"} ref={ref} {...props} />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShown((prev) => !prev)}
          type="button"
          className="shrink-0 grow-0"
        >
          {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

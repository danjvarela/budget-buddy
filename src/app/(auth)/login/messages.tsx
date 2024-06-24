"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { cva, VariantProps } from "class-variance-authority"
import omit from "lodash/omit"
import { cn } from "@/lib/utils"

const messageVariants = cva(["w-full rounded-lg py-2 px-4"], {
  variants: {
    variant: {
      default: ["bg-accent text-accent-foreground"],
      destructive: ["bg-destructive text-destructive-foreground"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface MessageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof messageVariants> {
  className?: string
  title?: string
  description: string
}

function Message({ variant, className, title, description }: MessageProps) {
  return (
    <div className={cn(messageVariants({ variant, className }))}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs font-semibold">{description}</p>
    </div>
  )
}

type MessageItem = Record<string, MessageProps>

export default function Messages() {
  const [messages, setMessages] = useState<MessageItem>({})
  const searchParams = useSearchParams()
  const accountVerificationStatus = searchParams.get(
    "account-verification-status"
  )

  function removeMessage(id: string) {
    setMessages((prev) => {
      return omit(prev, [id])
    })
  }

  function addMessage(
    id: string,
    message: MessageProps,
    removeDelay: number = 5000
  ) {
    setMessages((prev) => {
      return { [id]: message, ...prev }
    })

    setTimeout(() => {
      removeMessage(id)
    }, removeDelay)
  }

  useEffect(() => {
    if (accountVerificationStatus === "fail") {
      addMessage("account-verification-fail", {
        variant: "destructive",
        description: "Account verification link is either invalid or expired",
      })
    }

    if (accountVerificationStatus === "nokey") {
      addMessage("account-verification-nokey", {
        variant: "destructive",
        description:
          "No key was present on your link. Either it has been tampered with or this is bug.",
      })
    }

    if (accountVerificationStatus === "success") {
      addMessage("account-verification-success", {
        description: "Account has been verified successfully",
      })
    }
  }, [accountVerificationStatus])

  return (
    <>
      {Object.entries(messages).map(([id, message]) => (
        <Message key={id} {...message} />
      ))}
    </>
  )
}

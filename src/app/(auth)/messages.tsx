"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cva, VariantProps } from "class-variance-authority"
import omit from "lodash/omit"
import { cn } from "@/lib/utils"

const MESSAGE_REMOVE_DELAY = 1000 * 10
const MESSAGE_SEARCH_PARAM_KEY = "message"

const messageVariants = cva(
  ["w-full rounded-lg py-2 px-4 min-h-10 flex flex-col justify-center"],
  {
    variants: {
      variant: {
        default: ["bg-accent text-accent-foreground"],
        destructive: ["bg-destructive text-destructive-foreground"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}

type MessageItem = Record<string, MessageProps>

export default function Messages() {
  const router = useRouter()
  const pathname = usePathname()
  const [messages, setMessages] = useState<MessageItem>({})
  const searchParams = useSearchParams()

  const messageId = searchParams.get(MESSAGE_SEARCH_PARAM_KEY)

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => {
      return omit(prev, [id])
    })
  }, [])

  const addMessage = useCallback(
    (
      id: string,
      message: MessageProps,
      removeDelay: number = MESSAGE_REMOVE_DELAY
    ) => {
      setMessages((prev) => {
        return { [id]: message, ...prev }
      })

      setTimeout(() => {
        removeMessage(id)
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(MESSAGE_SEARCH_PARAM_KEY)
        router.replace(`${pathname}?${newSearchParams.toString()}`)
      }, removeDelay)
    },
    [removeMessage, searchParams, router, pathname]
  )

  useEffect(() => {
    if (messageId === "account-verification-fail") {
      addMessage(messageId, {
        variant: "destructive",
        title: "Unable to verify account",
        description: "Account verification link is either invalid or expired.",
      })
    }

    if (messageId === "account-verification-success") {
      addMessage(messageId, {
        description: "Your account has been verified.",
      })
    }
  }, [messageId])

  return (
    <>
      {Object.entries(messages).map(([id, message]) => (
        <Message key={id} {...message} />
      ))}
    </>
  )
}

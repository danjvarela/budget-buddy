import { useEffect } from "react"
import { useToast } from "./ui/use-toast"

type Props = {
  result: {
    data?: {
      success: string
    }
    serverError?: string
  }
}

export function ActionErrorToast({ result }: Props) {
  const { toast } = useToast()

  useEffect(() => {
    if (result.data?.success) {
      toast({
        variant: "default",
        description: result.data.success,
      })
    } else if (result.serverError) {
      toast({
        variant: "destructive",
        description: result.serverError,
      })
    }
  }, [result, toast])

  return null
}

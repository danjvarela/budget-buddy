import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { debounce } from "lodash"

type UrlStateValue = string | number

export function useUrlState<T extends UrlStateValue>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const resolveSearchParamValue = useCallback(() => {
    const s = searchParams.get(key)
    if (s === null) return initialValue

    if (typeof initialValue === "number") {
      const parsed = parseFloat(s)
      if (isNaN(parsed)) return initialValue
      return parsed as T
    } else {
      return s as T
    }
  }, [searchParams])

  const [value, setValue] = useState<T>(resolveSearchParamValue)

  const updateSearchParams = useCallback(
    (value: T) => {
      const mutableSearchParams = new URLSearchParams(searchParams.toString())
      mutableSearchParams.set(key, value.toString())
      router.replace(`${pathname}?${mutableSearchParams.toString()}`, {
        scroll: false,
      })
    },
    [searchParams, key, router, pathname]
  )

  useEffect(() => {
    const debouncedUpdatedSearchParams = debounce(updateSearchParams, 500)
    debouncedUpdatedSearchParams(value)
  }, [value, updateSearchParams])

  return [value, setValue]
}

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type UrlStateValue = string | number

export function useUrlState<T extends UrlStateValue>(
  key: string,
  initialValue: T
): [T, (value: T | ((previousValue: T) => T)) => void] {
  const [initialized, setInitialized] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const value = useMemo(() => {
    if (!initialized) return initialValue

    const v = searchParams.get(key)

    if (typeof initialValue === "number") {
      return parseFloat(v as string) as T
    }

    return v as T
  }, [initialValue, key, searchParams, initialized])

  const setValue = useCallback(
    (newValue: T | ((prevValue: T) => T)) => {
      const resolvedNewValue =
        typeof newValue === "function" ? newValue(value) : newValue

      // don't do anything if value is not changed
      if (resolvedNewValue === value) return

      const s = new URLSearchParams(searchParams.toString())

      s.set(key, resolvedNewValue.toString())

      router.replace(`${pathname}?${s.toString()}`)
    },
    [searchParams, key, pathname, router, value]
  )

  useEffect(() => {
    if (!initialized) {
      const s = new URLSearchParams(searchParams.toString())
      s.set(key, initialValue.toString())
      setInitialized(true)
      router.replace(`${pathname}?${s.toString()}`)
    }
  }, [router, searchParams, pathname, key, initialValue])

  return [value, setValue]
}

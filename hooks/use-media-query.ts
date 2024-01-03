import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [value, setValue] = useState<boolean>()

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  if (typeof value === 'undefined') {
    return true
  }

  return value
}

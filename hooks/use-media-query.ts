import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}

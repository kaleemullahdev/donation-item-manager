import { useEffect, useState } from 'react'

//This hook is created for seperation concern and clean code
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

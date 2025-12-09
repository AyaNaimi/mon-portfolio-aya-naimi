import { useState, useEffect } from "react"

export function useLoader() {
  const [showLoader, setShowLoader] = useState(true) // Changed to true for testing
  const [hasSeenLoader, setHasSeenLoader] = useState(false)

  useEffect(() => {
    // Check if user has seen the loader before
    // const loaderSeen = localStorage.getItem("portfolio-loader-seen")
    
    // Temporarily disable localStorage check for testing
    // if (!loaderSeen) {
    //   setShowLoader(true)
    // } else {
    //   setHasSeenLoader(true)
    // }
    
    // Always show loader for testing
    setShowLoader(true)
  }, [])

  const hideLoader = () => {
    setShowLoader(false)
    localStorage.setItem("portfolio-loader-seen", "true")
    setHasSeenLoader(true)
  }

  return {
    showLoader,
    hasSeenLoader,
    hideLoader
  }
}
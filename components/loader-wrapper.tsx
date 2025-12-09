"use client"

import { useLoader } from "@/hooks/use-loader"
import { Loader } from "@/components/loader"

interface LoaderWrapperProps {
  children: React.ReactNode
}

export function LoaderWrapper({ children }: LoaderWrapperProps) {
  const { showLoader, hideLoader } = useLoader()

  return (
    <>
      {children}
      {showLoader && <Loader onComplete={hideLoader} />}
    </>
  )
}
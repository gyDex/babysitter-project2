'use client'

import { useHeader } from "@/entities/stores/useHeader"
import { useEffect } from "react"

export const ProfileParentPage = () => {
  const headerState = useHeader();
  
  useEffect(() => {
    headerState.setTransparent(false);
  }, [])
  
  return (
    <>

    </>
  )
}

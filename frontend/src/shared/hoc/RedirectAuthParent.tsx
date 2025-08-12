'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

const RedirectAuthParent: React.FC<Props> = ({ children }) => {
  const { isAuth, roleAuth, user } = useAuth()
  
  const router = useRouter();
  
  console.log('auth-parent')

  useEffect(() => {
    if (isAuth === undefined || !user?.roles?.[0]) return

    if (!isAuth || user.roles[0] !== 'PARENT')
    {
        router.replace('/not-found')
    }
  }, [isAuth, user, roleAuth, router])

  if (isAuth === undefined || !user?.roles?.[0]) 
    return (  
        <div className="w-full flex justify-center h-[85svh] items-center">
          <div className="w-full max-w-[1200px] items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-[#7733F4]"></div>
              <span className="text-sm text-gray-600">Загрузка...</span>
            </div>
          </div>
        </div>               
    )

  return <>{children}</>
}

export default RedirectAuthParent

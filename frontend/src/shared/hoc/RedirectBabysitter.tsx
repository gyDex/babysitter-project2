'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react"

type Props = {
    children: React.ReactNode,
}

const RedirectAuthBabysitter:React.FC<Props> = ({children}) => {
  const { isAuth, roleAuth, user } = useAuth()
  const router = useRouter();

  const pathname = usePathname();

    console.log('auth-baby')

    useEffect(() => {
        if (isAuth === undefined || !user?.roles?.[0]) return

        if (!isAuth && user.roles[0] !== 'NANNY') {
            router.replace('/not-found');
        }

        if (user?.nannyProfile?.isValidated !== undefined && user?.nannyProfile?.isValidated !== null) {
            if (user.nannyProfile.isValidated !== true) {
              router.replace('/about-you/response/');
              return;
            }
        }

        if (isAuth && pathname === '/profile-babysitter/vacancy') return;
        if (isAuth && pathname.includes('/profile-babysitter/vacancy-detail/')) return;

        router.replace('/profile-babysitter/response/');
    }, [isAuth, roleAuth, router, user]);
    
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

export default RedirectAuthBabysitter
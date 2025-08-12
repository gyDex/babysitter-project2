'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"

type Props = {
    children: React.ReactNode,
}

const RedirectBeforeAuth:React.FC<Props> = ({children}) => {
    const { isAuth, roleAuth, user } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (isAuth && user !== null && user.roles[0] === 'PARENT') {
            if (user.parentProfile.subscribe) {
                const expiresAt = new Date(user.parentProfile.subscribe.expiresAt);
                const now = new Date();

                if (now >= expiresAt) {
                    console.log('Дата просрочена');
                } else {
                    console.log('Подписка не истекла')
                    router.replace('/profile-parent/vacancy');
                }
            }
        }

        if (isAuth && user !== null && user.roles[0] === 'NANNY') {
            if (user.nannyProfile.isValidated) {
                router.replace('/profile-babysitter/response');
                return;
            }
            else if (!user.nannyProfile.isValidated) {
                router.replace('/about-you');
                return;
            }
        }

    }, [isAuth, roleAuth, router, user]);
    
    return (<>{children}</>)
}

export default RedirectBeforeAuth
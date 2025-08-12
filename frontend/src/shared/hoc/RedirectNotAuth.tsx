'use client'

import { useAuth } from "@/entities/stores/useAuth"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"

type Props = {
    children: React.ReactNode,
}

const RedirectNotAuth:React.FC<Props> = ({children}) => {
    const { isAuth, roleAuth } = useAuth();

    const router = useRouter();

    console.log('not-auth')

    useEffect(() => {
        if (!isAuth || roleAuth !== 'parent') {
            router.replace('/auth/login');
        }
    }, [isAuth, roleAuth, router]);

    if (!isAuth || roleAuth !== 'parent') {
        return null;
    }

    if (isAuth && roleAuth) {
        return (<>{children}</>)
    }
}

export default RedirectNotAuth

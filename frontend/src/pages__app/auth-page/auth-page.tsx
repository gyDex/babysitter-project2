'use client'

import { useHeader } from "@/entities/stores/useHeader"
import React, { useEffect } from "react";

import styles from './auth-page.module.scss'
import PhoneStage from "@/widgets/AuthStages/PhoneStage/PhoneStage";
import CodeStage from "@/widgets/AuthStages/CodeStage/CodeStage";
import { useRegisterStage } from "@/entities/stores/useRegisterStage";
import PaymentStage from "@/widgets/AuthStages/PaymentStage/PaymentStage";
import HeaderMenu from "@/widgets/HeaderMenu/HeaderMenu";
import { useNotFound } from "@/entities/stores/useNotFound";

type Props = {
  without_sub?: boolean,
}

const AuthPage:React.FC<Props> = ({}) => {
    const headerState = useHeader();

    const registerStage = useRegisterStage();

    const { setNotFound }  = useNotFound();      
    
    useEffect(() => {
        headerState.setTransparent(true);

        setNotFound(true);

        function beforeUnload(e: BeforeUnloadEvent) {
            e.preventDefault();
            setNotFound(false);
        }

        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
        };
    },[])

    return (
        <>
            <HeaderMenu />

            <div className={styles['auth-page']}>
                <div className={styles['auth-page__bg']}>
                    <video
                    src="https://rccsowmhkwlvmka0.public.blob.vercel-storage.com/222.mp4"
                    width={100}
                    height={100}
                    autoPlay
                    loop
                    muted
                    playsInline
                    >
                    Ваш браузер не поддерживает видео.
                    </video>

                </div>

                {
                    registerStage.stage === 'phone' && <PhoneStage />
                }

                {
                    registerStage.stage === 'code' && <CodeStage />
                }
                
                {
                    registerStage.stage === 'payment' && <PaymentStage without_sub={false} />
                }
            </div>  
        </>
    )
}

export default AuthPage

'use client'

import { useHeader } from "@/entities/stores/useHeader"
import React, { useEffect } from "react";

import styles from './auth-page.module.scss'
import PhoneStage from "@/widgets/AuthStages/PhoneStage/PhoneStage";
import CodeStage from "@/widgets/AuthStages/CodeStage/CodeStage";
import { useRegisterStage } from "@/entities/stores/useRegisterStage";
import PaymentStage from "@/widgets/AuthStages/PaymentStage/PaymentStage";
import HeaderMenu from "@/widgets/HeaderMenu/HeaderMenu";

type Props = {
  without_sub?: boolean,
}


const AuthPage:React.FC<Props> = ({without_sub = false}) => {
    const headerState = useHeader();

    const registerStage = useRegisterStage();
    
    useEffect(() => {
        headerState.setTransparent(true);
    },[])

    return (
        <>
            <HeaderMenu />

            <div className={styles['auth-page']}>
                <div className={styles['auth-page__bg']}>
                    <video
                    src="/images/main-hero/video.mp4"
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
                    registerStage.stage === 'payment' && <PaymentStage without_sub={without_sub} />
                }
            </div>  
        </>
    )
}

export default AuthPage

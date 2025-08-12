'use client'

import { useHeader } from "@/entities/stores/useHeader"
import React, { useEffect } from "react";

import styles from './auth-page.module.scss'
import PaymentStage from "@/widgets/AuthStages/PaymentStage/PaymentStage";
import HeaderMenu from "@/widgets/HeaderMenu/HeaderMenu";

type Props = {
  without_sub?: boolean,
}


const AuthWithoutSubPage:React.FC<Props> = ({without_sub = false}) => {
    const headerState = useHeader();
    
    useEffect(() => {
        headerState.setTransparent(true);
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
                
                <PaymentStage without_sub={without_sub} />
                
            </div> 
        </>
    )
}

export default AuthWithoutSubPage

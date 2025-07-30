'use client';

import { useRegisterStage } from '@/entities/stores/useRegisterStage';
import styles from './CodeStage.module.scss'
import Button from '@/shared/compontents/Button';

const CodeStage = () => {
    const registerStage = useRegisterStage();

    return (
        <section className={styles['code-stage']}>
            <h1 className={styles['code-stage__title']}>Код отправили на номер 
                <span className={styles['code-stage__phone']}>
                    +7 903 000 00 00
                </span>
            </h1>
            
            <button onClick={() => registerStage.setStage('phone')} className={styles['code-stage__prev']}>
                Изменить номер
            </button>


            <div className={styles['code-stage__bottom']}>
                <input type="text" placeholder='Введите код' className={styles['code-stage__input']} />

                <Button onClick={() => registerStage.setStage('payment')} style={{
                    marginTop: '0px',
                }} text='Продолжить' variation='second' type='button' />
            </div>
        </section>
    )
}

export default CodeStage

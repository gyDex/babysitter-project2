'use client'
import styles from './PhoneStage.module.scss'
import clsx from 'clsx';
import Button from '@/shared/compontents/Button';
import { useAuth } from '@/entities/stores/useAuth';
import { useRegisterStage } from '@/entities/stores/useRegisterStage';

const PhoneStage = () => {
    const authState = useAuth();

    const registerStage = useRegisterStage();

    return (
        <section className={styles['phone-stage']}>
            <h1 className={styles['phone-stage__title']}>Вход и регистрация</h1>

            <div className={styles['phone-stage__roles']}>
                <button onClick={() => authState.setRole('parent')} className={clsx('', {
                    [styles['phone-stage__role']]: authState.roleAuth === 'babysitter',
                    [styles['phone-stage__role_active']]: authState.roleAuth === 'parent',
                })}>
                    Я мама
                </button>

                <button onClick={() => authState.setRole('babysitter')} className={clsx('', {
                    [styles['phone-stage__role']]: authState.roleAuth === 'parent',
                    [styles['phone-stage__role_active']]: authState.roleAuth === 'babysitter',
                })}>
                    Я няня
                </button>
            </div>

            <div className={styles['phone-stage__bottom']}>
                <input type="text" placeholder='Номер телефона' className={styles['phone-stage__input']} />

                <Button onClick={() => registerStage.setStage('code')} style={{
                    marginTop: '0px',
                }} text='Продолжить' variation='second' type='button' />
            </div>
        </section>
    )
}

export default PhoneStage

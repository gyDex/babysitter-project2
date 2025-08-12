'use client';

import { useRegisterStage } from '@/entities/stores/useRegisterStage';
import styles from './CodeStage.module.scss'
import Button from '@/shared/compontents/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { verifyCode } from '@/shared/api/authApi';
import { useAuth } from '@/entities/stores/useAuth';
import api from '@/shared/api';
import { useRouter } from 'next/navigation';

const schema = z.object({
  code: z
    .string()
    .min(1, 'Введите номер телефона')
    .max(6,'Введите корректный код')
});

const CodeStage = () => {
    const registerStage = useRegisterStage();

    const authState = useAuth();

    const {
        handleSubmit,
        register,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            code: ''
        },
    });

    const onSubmit = async (data: { code: string}) => {
        try {
            await verifyCode({phone:authState.phone, code: data.code,});

            const res = await api.get('/auth/get-me', { withCredentials: true });

            authState.setAuth(true);
            authState.setUser(res.data)
            authState.setRole(res.data.roles?.[0]);

            console.log(authState)

            if (res.data.parentProfile !== null) {
                if (res.data.parentProfile.subscribe === undefined || res.data.parentProfile.subscribe === null) {
                    registerStage.setStage('payment');
                }
            }

        } catch (error) {
            console.error('Ошибка при запросе кода:', error);
        }
    }

    return (
        <section className={styles['code-stage']}>
            <h1 className={styles['code-stage__title']}>Код отправили на номер 
                <span className={styles['code-stage__phone']}>
                    {authState.phone}
                </span>
            </h1>
            
            <button onClick={() => registerStage.setStage('phone')} className={styles['code-stage__prev']}>
                Изменить номер
            </button>

            <form  className={styles['code-stage__bottom']} action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('code')} placeholder='Введите код' className={styles['code-stage__input']} />

                <Button  style={{
                    marginTop: '0px',
                }} text='Продолжить' variation='second' type='submit' />
            </form>
        </section>
    )
}

export default CodeStage

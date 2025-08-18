'use client'
import styles from './PhoneStage.module.scss'
import clsx from 'clsx';
import Button from '@/shared/compontents/Button';
import { useAuth } from '@/entities/stores/useAuth';
import { useRegisterStage } from '@/entities/stores/useRegisterStage';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { requestCode } from '@/shared/api/authApi';

const schema = z.object({
  phone: z
    .string()
    .min(1, 'Введите номер телефона')
    .regex(/^7\d{10}$/, 'Введите корректный номер в формате 7XXXXXXXXXX'),
});


const PhoneStage = () => {
    const authState = useAuth();

    const registerStage = useRegisterStage();

    const {
        formState: {
            errors
        },
        handleSubmit,
        register,
        setError
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        phone: authState?.phone
      },
    });

  
    const onSubmit = async (data: { phone: string}) => {
        try {
            await requestCode(data.phone, authState.roleAuth);
            registerStage.setStage('code')
        } catch (error) {
            console.error('Ошибка при запросе кода:', error);
        }
    }

    return (
        <section className={styles['phone-stage']}>
            <h1 className={styles['phone-stage__title']}>Вход и регистрация</h1>

            <div className={styles['phone-stage__roles']}>
                <button onClick={() => authState.setRole('PARENT')} className={clsx('', {
                    [styles['phone-stage__role']]: authState.roleAuth === 'NANNY' || authState.roleAuth === 'baby',
                    [styles['phone-stage__role_active']]: authState.roleAuth === 'PARENT' || authState.roleAuth === 'parent',
                })}>
                    Я мама
                </button>

                <button onClick={() => authState.setRole('NANNY')} className={clsx('', {
                    [styles['phone-stage__role']]: authState.roleAuth === 'PARENT' || authState.roleAuth === 'parent',
                    [styles['phone-stage__role_active']]: authState.roleAuth === 'NANNY' || authState.roleAuth === 'baby',
                })}>
                    Я няня
                </button>
            </div>

            <form  className={styles['phone-stage__bottom']} action="" onSubmit={handleSubmit(onSubmit)}>
                <input {...register('phone')} onChange={(e) => authState.setPhone(e.currentTarget.value)} value={authState.phone} type="text" placeholder='Номер телефона' className={styles['phone-stage__input']} />

                <Button style={{
                    marginTop: '0px',
                }} text='Продолжить' variation='second' type='submit' />
            </form>            
            
            {
                errors && errors.phone &&
                <span className='text-[red] font-[onest] text-[14px]'>{errors?.phone.message}</span>
            }
        </section>
    )
}

export default PhoneStage

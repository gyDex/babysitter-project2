
import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import styles from './profile-edit-stage.module.scss'
import ProfileEditCheckItem from './ProfileEditCheckItem';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';


const ProfileEditFourStage = () => {
    const stage = useEditParentStage();
    
    const { duties, setDuties } = useAnketsParent();

    const handleChange = (index: number) => {
        const prev = duties;
        prev[index] = !prev[index];
        setDuties(prev);
    }

    console.log(duties)

    return (
        <div className={styles['profile-edit-stage']}>
            <div className={styles['profile-edit-stage__top']}>
                <div className={styles['profile-edit-stage__top-row']}>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item_active']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                </div>

                <span className={styles['profile-edit-stage__top-description']}>шаг 4/7</span>
            </div>

            <h2 className={styles['profile-edit-stage__title']}>Какие обязанности вы ожидаете, чтобы няня также выполняла?</h2>

            <div className={styles['profile-edit-stage__content_three']}>
                <div className={styles['profile-edit-stage__check-list_three']}> 
                    <ProfileEditCheckItem checked={duties[0]} onChange={() => handleChange(0)} text='Приготовление пищи' />
                    <ProfileEditCheckItem checked={duties[1]} onChange={() => handleChange(1)} text='Организация дет. мероприятий' />
                    <ProfileEditCheckItem checked={duties[2]} onChange={() => handleChange(2)} text='Купание детей' />
                    <ProfileEditCheckItem checked={duties[3]} onChange={() => handleChange(3)} text='Стирка и глажка одежды' />
                    <ProfileEditCheckItem checked={duties[4]} onChange={() => handleChange(4)} text='Помощь с дом. заданиями' />
                    <ProfileEditCheckItem checked={duties[5]} onChange={() => handleChange(5)} text='Работа с двойней, тройней' />
                    <ProfileEditCheckItem checked={duties[6]} onChange={() => handleChange(6)} text='Покупка продуктов' />
                    <ProfileEditCheckItem checked={duties[7]} onChange={() => handleChange(7)} text='Поддерживать порядок в комнате' />
                    <ProfileEditCheckItem checked={duties[8]} onChange={() => handleChange(8)} text='Уборка в доме' />
                    <ProfileEditCheckItem checked={duties[9]} onChange={() => handleChange(9)} text='Поддержание порядка' />
                    <ProfileEditCheckItem checked={duties[10]} onChange={() => handleChange(10)} text='Сопровождение детей' />
                    <ProfileEditCheckItem checked={duties[11]} onChange={() => handleChange(11)} text='Детская гигиена' />
                    <ProfileEditCheckItem checked={duties[12]} onChange={() => handleChange(12)} text='Уход за домашними животными' />
                    <ProfileEditCheckItem checked={duties[13]} onChange={() => handleChange(13)} text='Уход за растениями' />
                </div>
            </div>

            <div className={styles['profile-edit-stage__bottom']}>
                <button onClick={() => stage.setStage('three')} className={styles['profile-edit-stage__btn-bottom_prev']}>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Назад
                </button>

                <button onClick={() => stage.setStage('five')} className={styles['profile-edit-stage__btn-bottom']}>
                Продолжить
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.33273 8H13.5527" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </button>
            </div>
            </div>
    )
}

export default ProfileEditFourStage

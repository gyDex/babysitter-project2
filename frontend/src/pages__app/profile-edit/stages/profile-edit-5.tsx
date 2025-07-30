
import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import styles from './profile-edit-stage.module.scss'
import { useAnketsParent } from '@/entities/stores/useAnketsParent';

const ProfileEditFiveStage = () => {
    const stage = useEditParentStage();

    const { description, setDescription } = useAnketsParent();
    
    return (
        <div className={styles['profile-edit-stage']}>
            <div className={styles['profile-edit-stage__top']}>
                <div className={styles['profile-edit-stage__top-row']}>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item_active']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                <div className={styles['profile-edit-stage__top-item']}></div>
                </div>

                <span className={styles['profile-edit-stage__top-description']}>шаг 5/7</span>
            </div>

            <h2 className={styles['profile-edit-stage__title']}>Остались пожелания?</h2>

            <span className={styles['profile-edit-stage__description']}>Важные детали для специалиста, о которых мы не спросили</span>

            <textarea value={description}  onChange={(e) => setDescription(e.currentTarget.value)} placeholder='Описание' className='border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] text-[#D9D9D9] text-[18px] leading-[24px] font-normal min-h-[145px] min-[768px]:hidden' />

            <input value={description}  onChange={(e) => setDescription(e.currentTarget.value)} className='border-1 border-[#D9D9D9] w-full px-[16px] py-[18px] rounded-[16px] text-[#D9D9D9] text-[18px] leading-[24px] font-normal max-[768px]:hidden' placeholder='Описание'  />
            
            <div className={styles['profile-edit-stage__bottom']}>
                <button onClick={() => stage.setStage('four')} className={styles['profile-edit-stage__btn-bottom_prev']}>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Назад
                </button>

                <button onClick={() => stage.setStage('six')} className={styles['profile-edit-stage__btn-bottom']}>
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

export default ProfileEditFiveStage

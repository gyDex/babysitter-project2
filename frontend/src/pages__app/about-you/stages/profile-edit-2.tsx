import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { useAnketsBabysitter } from "@/entities/stores/useAnketsBabysitter";

const ProfileEditTwoStage = () => {
  const stage = useEditBabysitterStage();

  const { setCount, count } = useAnketsBabysitter();

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 3/12</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Укажите сколько лет вы работали с детьми</h2>

      <div className='w-full flex justify-center items-center'>
        <div className='flex items-center justify-center gap-[24px]'>
            <button onClick={() => 
            {
              setCount(Number(count) + 1)
            }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#E8E5F9"/>
                    <path d="M12 16H20" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 20V12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <span className='w-[128px] flex items-center justify-center h-[128px] font-[onest] text-[100px] font-semibold'>
                {
                    count >= 10 ? count : `0${count}`
                }
            </span>

            <button onClick={() => 
            {
              if (count > 0){
                setCount(count - 1)
              }
              else {
                setCount(0)
              }
            }}> 
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#E8E5F9"/>
                    <path d="M12 16H20" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
      </div>

      <div className={styles['profile-edit-stage__bottom']}>
        <button onClick={() => stage.setStage('second')} className={styles['profile-edit-stage__btn-bottom_prev']}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Назад
        </button>

        <button onClick={() => stage.setStage('four')} className={styles['profile-edit-stage__btn-bottom']}>
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

export default ProfileEditTwoStage

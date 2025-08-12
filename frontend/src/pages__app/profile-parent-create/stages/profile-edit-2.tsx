import Calendar from "@/widgets/Calendar/Calendar"
import styles from './profile-edit-stage.module.scss';
import { useAnketsParent } from "@/entities/stores/useAnketsParent";
import { useCreateParentStage } from "@/entities/stores/useCreateParentStage";

const ProfileEditTwoStage = () => {
  const stage = useCreateParentStage();

  const { calendar, changeCalendar } = useAnketsParent();

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 2/7</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Выберите подходящие вам дни и время работы</h2>

      <Calendar items={calendar} setitems={changeCalendar} />

      <div className={styles['profile-edit-stage__bottom']}>
        <button onClick={() => stage.setStage('first')} className={styles['profile-edit-stage__btn-bottom_prev']}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          Назад
        </button>

        <button onClick={() => stage.setStage('three')} className={styles['profile-edit-stage__btn-bottom']}>
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

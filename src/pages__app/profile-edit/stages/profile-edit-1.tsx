'use client'

import styles from './profile-edit-stage.module.scss';
import { useEffect, useState } from 'react';
import { ProfileEditOneStageItem } from './profile-edit-1_item';
import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';


const ProfileEditOneStage = () => {
  const stage = useEditParentStage();
  
  const [count] = useState(1);

  const [isTrigger, setTrigger] = useState(false);

  const [isValid, setValid] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    setValid((prev) => {
      const next = [...prev];
      while (next.length < count) next.push(false);
      return next;
    });
  }, [count]);

  const { children, addChildren } = useAnketsParent();

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
          <div className={styles['profile-edit-stage__top-item']}></div>
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 1/7</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>Расскажите о детях, с которыми предстоит работать одновременно</h2>

      <div className={styles['profile-edit-stage__content']}>
          <div className={styles['profile-edit-stage__items']}>
            {children.map((item: any, index: number) => (
              <ProfileEditOneStageItem setValid={setValid} isTrigger={isTrigger} key={index} index={index} />
            ))}
          </div>

          <button onClick={() => addChildren(
            {
              gender: '',
              age: '',
            }
          )}
           className={styles['profile-edit-stage__btn-create']}>
            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 5.83325L14.5 22.1666" stroke="#7C8092" stroke-width="2" stroke-linecap="round"/>
              <path d="M22.667 14L6.33366 14" stroke="#7C8092" stroke-width="2" stroke-linecap="round"/>
            </svg>

            Добавить ребенка
          </button>
    </div>


      <button onClick={() => {
        setTrigger(true)
        const allValid = isValid.every(Boolean);
        if (allValid) {
          stage.setStage('second')
        }
      }} className={styles['profile-edit-stage__btn-bottom']}>
        Продолжить
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.61935 3.95312L13.666 7.99979L9.61935 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.33273 8H13.5527" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default ProfileEditOneStage

import styles from './profile-edit-stage.module.scss';
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage";
import { useAnketsBabysitter } from "@/entities/stores/useAnketsBabysitter";
import clsx from 'clsx';
import { useEffect } from 'react';


const ProfileEditThreeStage = () => {
  const stage = useEditBabysitterStage();

  const { setAge, age } = useAnketsBabysitter();
    const ages = [
        {
            name:'до 1 года',
            id: '1year',
        },
        {
            name:'1-2 года',
            id: '1-2year',
        },
        {
            name:'3-5 лет',
            id: '3-5year',
        },
        {
            name:'6-9 лет',
            id: '6-9year',
        },
        {
            name:'10 лет и старше',
            id: '10more',
        }
  ]

  console.log(age)

  useEffect( () => {
      setAge(ages.map((item, index) => {
        return {
          name: item.name,
          id: item.id,
          select: age[index].select
        }
      }))
  },[]) 

  return (
    <div className={styles['profile-edit-stage']}>
      <div className={styles['profile-edit-stage__top']}>
        <div className={styles['profile-edit-stage__top-row']}>
          <div className={styles['profile-edit-stage__top-item_active']}></div>
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
        </div>

        <span className={styles['profile-edit-stage__top-description']}>шаг 3/11</span>
      </div>

      <h2 className={styles['profile-edit-stage__title']}>С детьми какого возраста вы работаете?</h2>

      <div className='flex-wrap gap-[8px] flex'>
        {
              ages.map((item, index) => <>
                <button className={clsx('px-[24px] py-[16px] rounded-[24px] font-[onest] leading-[18px] text-[14px] font-semibold',
                  {
                      ['bg-[#7733F4] text-[white]'] : age[index]?.select === true,
                      ['bg-[#EFF0F5] text-[#191816]'] : age[index]?.select !== true
                  }
                )} key={item.id} onClick={() => {
                    const prev = age;

                    if (age[index].select !== true) {
                        prev[index] = {
                          ...prev[index],
                          select: true,
                        };
                        setAge(prev)
                        return;
                    }

                    prev[index] = {
                      ...prev[index],
                      select: false,
                    };
                    setAge(prev)
                }}>
                    {item.name}
                </button>
            </>)
        }

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

export default ProfileEditThreeStage

'use client'

import React, { useEffect, useState } from 'react'
import styles from './Calendar.module.scss'
import CalendarItem from './CalendarItem'

type Props = {
    isEdit?: boolean,
    items?: any,
    setitems?: (value: any) => void;
}

const Calendar:React.FC<Props> = ({isEdit = true, items = [], setitems}) => {
    const [Items, setItems] = useState<boolean[]>(new Array(28).fill(false));       

    useEffect(() => {
        const allFalse = Items.every((item) => item === false);

        if (!allFalse && setItems !== undefined) {
            // @ts-ignore
            setitems(Items);
        }
    },[Items])

    console.log(items)

    const toggleItem = (index: number) => {
        setItems((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    return (
        <div className={styles['calendar']}>
            <div className={styles['calendar__inner']}>
                <div className={styles['calendar__left']}>
                    <div  className={styles['calendar__left-item']}>
                        Утро
                    </div>
                    <div  className={styles['calendar__left-item']}>
                        День
                    </div>
                    <div  className={styles['calendar__left-item']}>
                        Вечер
                    </div>
                    <div  className={styles['calendar__left-item']}>
                        Ночь
                    </div>
                </div>

                <div className={styles['calendar__right']}>
                    <div className={styles['calendar__right-top']}>
                        <div className={styles['calendar__top-item']}>
                            ПН
                        </div>
                        <div className={styles['calendar__top-item']}>
                            ВТ
                        </div>
                        <div className={styles['calendar__top-item']}>
                            СР
                        </div>
                        <div className={styles['calendar__top-item']}>
                            ЧТ
                        </div>
                        <div className={styles['calendar__top-item']}>
                            ПТ
                        </div>
                        <div className={styles['calendar__top-item']}>
                            СБ
                        </div>
                        <div className={styles['calendar__top-item']}>
                            ВС
                        </div>
                    </div>

                    <div className={styles['calendar__right-content']}>                  
                        {Array.from({ length: 28 }).map((_, index) => (
                            <CalendarItem
                                key={index}
                                setActive={() => toggleItem(index)}
                                isEdit={isEdit}
                                isActive={items[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar

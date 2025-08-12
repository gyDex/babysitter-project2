'use client'

import styles from './profile-edit.module.scss'
import ProfileEditOneStage from './stages/profile-edit-1';
import ProfileEditTwoStage from './stages/profile-edit-2';
import ProfileEditThreeStage from './stages/profile-edit-3';
import ProfileEditFourStage from './stages/profile-edit-4';
import ProfileEditFiveStage from './stages/profile-edit-5';
import ProfileEditSixStage from './stages/profile-edit-6';
import ProfileEditSevenStage from './stages/profile-edit-7';
import { useEffect } from 'react';
import { useHeader } from '@/entities/stores/useHeader';
import HeaderMenu from '@/widgets/HeaderMenu/HeaderMenu';
import { useEditParentStage } from '@/entities/stores/useEditParentStage';
import { useParams } from 'next/navigation';
import { getVacancyById } from '@/shared/api/parentApi';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';

const ProfileParentEditPage = () => {
    const stage = useEditParentStage();

    const headerState = useHeader();

    const parentAnketa = useAnketsParent();

    const { id } = useParams();

    useEffect(() => {
        headerState.setTransparent(false);

        const getData = async() => {
            await getVacancyById(id as any).then((data: any) => {
                parentAnketa.setData(data)
            })
        }

        getData();
    }, [])

    return (
        <>
            <HeaderMenu />

            <section className={styles['profile-edit']}>
                <div className={styles['profile-edit__container']}>
                    <h1 className={styles['profile-edit__title']}>
                        Редактирование вакансии
                    </h1>

                    <div className={styles['profile-edit__inner']}>
                        {
                            stage.stage === 'first' && <ProfileEditOneStage />
                        }
                        {
                            stage.stage === 'second' && <ProfileEditTwoStage />
                        }
                        {
                            stage.stage === 'three' && <ProfileEditThreeStage />
                        }
                        {
                            stage.stage === 'four' && <ProfileEditFourStage />
                        }
                        {
                            stage.stage === 'five' && <ProfileEditFiveStage />
                        }
                        {
                            stage.stage === 'six' && <ProfileEditSixStage />
                        }
                        {
                            stage.stage === 'seven' && <ProfileEditSevenStage />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileParentEditPage

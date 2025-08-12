'use client'

import styles from './profile-parent-create.module.scss'
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
import { useCreateParentStage } from '@/entities/stores/useCreateParentStage';

const ProfileParentCreatePage = () => {
    const stage = useCreateParentStage();

    const headerState = useHeader();

    useEffect(() => {
        headerState.setTransparent(false);
    }, [])

    return (
        <>
            <HeaderMenu />

            <section className={styles['profile-create']}>
                <div className={styles['profile-create__container']}>
                    <h1 className={styles['profile-create__title']}>
                        Создание вакансии
                    </h1>

                    <div className={styles['profile-create__inner']}>
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

export default ProfileParentCreatePage

'use client'

import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@radix-ui/react-radio-group';
import styles from './profile-edit-stage.module.scss';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import React, { useEffect } from 'react';
import { useAnketsParent } from '@/entities/stores/useAnketsParent';

export const formSchema = z.object({
  gender:  z
  .string()
  .refine((val) => val === 'male' || val === 'female', {
    message: 'Выберите пол',
  }),
  age: z.string().min(1, 'Укажите возраст'),
});

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  index?: number;
  isTrigger: boolean,
  setValid: (valid: any) => void;
};

export const ProfileEditOneStageItem: React.FC<Props> = ({ index = 0, setValid }) => {
  const { children, changeChildren } = useAnketsParent();

  const { control, register, formState: { errors, isValid  }, trigger } =  useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: { gender: children[index].gender, age: children[index].age, },
      mode: 'all',
  });


  const handleValidate = async () => {
    const result = await trigger();

    setValid((prev: boolean[]) => {
      const updated = [...prev];
      updated[index ?? 0] = result; // index может быть 0, значит нужно явно указать
      return updated;
    });
  };

  const watchedValues = useWatch({ control });

  useEffect(() => {
    changeChildren(watchedValues, index);
  }, [watchedValues]);

  useEffect(() => {
    handleValidate();
  }, [isValid])

  return (
    <div key={index} className={styles['profile-edit-stage__item']}>
      <div>
        <span className={styles['profile-edit-stage__item-label']}>Укажите пол ребенка</span>
        <div className="min-w-[336px] flex flex-col gap-[12px]">
          <Controller
            control={control}
            name="gender"
            
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="max-[768px]:mb-[16px] min-[768px]:flex-row flex gap-[12px] flex-col"
              >
                <RadioItem
                  style={{ width: '100%' }}
                  id="baby"
                  name="Мужской"
                  value="male"
                  checked={field.value === 'male'}
                  onChange={() => field.onChange('male')}
                />
                <RadioItem
                  style={{ width: '100%' }}
                  id="parent"
                  name="Женский"
                  value="female"
                  checked={field.value === 'female'}
                  onChange={() => field.onChange('female')}
                />
              </RadioGroup>
            )}
          />
          {errors.gender && <span className="text-[red] text-sm">{errors.gender.message}</span>}
        </div>
      </div>

      <div className={styles['profile-edit-stage__right']}>
        <div className={styles['profile-edit-stage__input-wrap']}>
          <span className={styles['profile-edit-stage__item-label']}>Укажите возраст ребенка</span>
          <input
            className={styles['profile-edit-stage__item-input']}
            placeholder="Возраст"
            {...register('age')}
          />
          {errors.age && <span className="text-[red] text-sm">{errors.age.message}</span>}
        </div>
      </div>
    </div>
  );
};

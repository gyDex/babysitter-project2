import { RadioGroup } from '@/components/ui/radio-group';
import styles from './profile-edit-stage.module.scss';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import React, { useState } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAnketsBabysitter } from '@/entities/stores/useAnketsBabysitter';

type Props = {
    name: string,
    value: string,
    description: string,
    maxSlider: number,
    minSlider: number,

    id: string,

    selectedValue: any,
    setSelectedValue: (value: any) => void;
}

const ProfileEditSixStageItem: React.FC<Props> = ({
  value,
  id,
  name,
  description,
  maxSlider,
  minSlider,
  selectedValue,
  setSelectedValue,
}) => {
  // sliderValue — в процентах 0..100
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

  const { pay, setPay } = useAnketsBabysitter();

const toRealValue = (val: number) =>
  Math.round(maxSlider - (maxSlider - minSlider) * (val / 100));

  // При монтировании синхронизируем sliderValue с pay (если pay в процентах)
  // Если pay в реальных числах, то нужно сделать обратное преобразование

  return (
    <div className="w-full">
      <RadioGroup>
        <div
          className="max-[768px]:mb-[16px] min-[1024px]:flex-row flex gap-[12px] flex-col"
          role="radiogroup"
        >
          <RadioItem
            style={{
              width: '100%',
            }}
            id={id}
            name={name}
            value={value}
            variation="second"
            checked={selectedValue === value}
            description={description}
            onChange={() => setSelectedValue(value)}
          />
        </div>
      </RadioGroup>

      <span
        className={
          selectedValue === value
            ? styles['profile-edit-stage__slider-description']
            : styles['profile-edit-stage__slider-description_disabled']
        }
      >
        От {toRealValue(sliderValue[0])} до {toRealValue(sliderValue[1])}
      </span>

      <Slider
        disabled={selectedValue !== value}
        step={1}
        value={sliderValue}
        onChange={(val: any) => {
          if (Array.isArray(val)) {
            setSliderValue(val);
            // Если хочешь, обновляй глобальный стор в процентах или в реальных числах
            setPay(val.map((v) => toRealValue(v)));
            console.log('Реальные значения:', val.map((v) => toRealValue(v)));
          }
        }}
        className={styles['profile-edit-stage__slider']}
        range
      />
    </div>
  );
};


export default ProfileEditSixStageItem

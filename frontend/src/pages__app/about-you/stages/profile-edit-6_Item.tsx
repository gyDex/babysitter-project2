import { RadioGroup } from '@/components/ui/radio-group';
import styles from './profile-edit-stage.module.scss';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import React, { useEffect, useState } from 'react';

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
  const { pay, setPay } = useAnketsBabysitter();

  const toRealValue = (val: number) =>
    Math.round(minSlider + ((maxSlider - minSlider) * val) / 100);

  const toPercentValue = (realVal: number) =>
    Math.round(((realVal - minSlider) / (maxSlider - minSlider)) * 100);

  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    if (selectedValue === value && pay.length === 2) {
      setSliderValue([toPercentValue(pay[0]), toPercentValue(pay[1])]);
    }

    setPay(minSlider as any)
  }, []);

  console.log()

  useEffect(() => {
    setPay(pay)
  }, [])

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
        От{' '}
        {selectedValue === value
          ? toRealValue(sliderValue[0])
          : minSlider}{' '}
        до{' '}
        {selectedValue === value
          ? toRealValue(sliderValue[1])
          : maxSlider}
      </span>

      <Slider
        disabled={selectedValue !== value}
        step={1}
        min={0}
        max={100}
        value={selectedValue === value ? sliderValue : [0, 100]}
        onChange={(val) => {
          if (Array.isArray(val)) {
            setSliderValue(val);
            setPay([toRealValue(val[0]), toRealValue(val[1])]);
            console.log('Реальные значения:', [
              toRealValue(val[0]),
              toRealValue(val[1]),
            ]);
          }
        }}
        className={styles['profile-edit-stage__slider']}
        range
      />
    </div>
  );
};


export default ProfileEditSixStageItem

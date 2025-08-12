import { RadioGroup } from '@/components/ui/radio-group';
import styles from './profile-edit-stage.module.scss';
import RadioItem from '@/widgets/RadioItem/RadioItem';
import React, { useState } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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

const ProfileEditSixStageItem:React.FC<Props>  = ({value, id, name, description,maxSlider,minSlider, selectedValue, setSelectedValue}) => {

    const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100]) as any

    const toRealValue = (val: number) =>
    Math.round(maxSlider + (minSlider - maxSlider) * (val / 100));

    return (
        <div className={'w-full'}>
            <RadioGroup>
                <div className="max-[768px]:mb-[16px] min-[1024px]:flex-row flex gap-[12px] flex-col" role="radiogroup">
                    <RadioItem
                        style={{
                            width: '100%',
                        }}
                        id={id}
                        name={name}
                        value={value}
                        variation='second'
                        checked={selectedValue === value}
                        description={description}
                        onChange={() => setSelectedValue((value))}
                    />
                </div>
            </RadioGroup>

            <span className={selectedValue === value ? styles['profile-edit-stage__slider-description'] :
                styles['profile-edit-stage__slider-description_disabled']
            }> От {toRealValue(sliderValue[0])} до {toRealValue(sliderValue[1])}</span>

            <Slider disabled={selectedValue !== value} step={1} // каждый % — 1 шаг
  min={0}
  max={100}
  value={sliderValue}
  onChange={(val: any) => {
    if (Array.isArray(val)) {
      setSliderValue(val);
      console.log('Реальные значения:', [toRealValue(val[0]), toRealValue(val[1])]);
    }
  }}
  className={styles['profile-edit-stage__slider']} range />
    </div>
  )
}

export default ProfileEditSixStageItem

import { RadioGroupItem } from '@/components/ui/radio-group'; // твой кастомный радио
import styles from './RadioItem.module.scss';
import { CSSProperties } from 'react';

type Props = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  style?: CSSProperties | undefined,
  description?: string | false,
  variation?: 'second'
};

const RadioItem: React.FC<Props> = ({ id, name, value, checked, onChange, style, description = false, variation}) => {
  return (
    <div
      className={styles['radio-item']}
      data-state={checked ? 'checked' : undefined}
      onClick={onChange} 
      role="radio"
      aria-checked={checked}
      style={style}
    >
      <label onClick={onChange}  className={styles['radio-item__label']} htmlFor={id}>
        {name}
        {
          description && 
          <span className={styles['radio-item__description']}>
            {description}
          </span>
        }
      </label>

      <RadioGroupItem
        className={`!w-[24px] !h-[24px] border-[#8D46F6] border-[2px] ${(variation === 'second' && !checked) && '!bg-[#D9D9D9] border-none'}`}
        value={value}
        id={id}
        checked={checked} 
      />
    </div>
  );
};

export default RadioItem;

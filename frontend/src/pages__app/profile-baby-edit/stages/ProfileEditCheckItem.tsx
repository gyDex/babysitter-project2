import { Checkbox } from '@/components/ui/checkbox';
import styles from './profile-edit-stage.module.scss';

type Props = {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ProfileEditCheckItem = ({ text, checked, onChange }: Props) => {
  return (
    <div onClick={() => {
      if (window.innerWidth <= 768) {
        onChange(!checked)
      }
    }}  className={styles['profile-edit-stage__check-item']}>
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="border-[2px] w-[24px] h-[24px]"
      />
      <span onClick={() => onChange(!checked)} className={styles['profile-edit-stage__check-title']}>{text}</span>
    </div>
  );
};

export default ProfileEditCheckItem;

import React from 'react';
import styles from './SwitchCheckbox.module.scss';

interface SwitchCheckboxProps {
    isChecked: boolean;
    onCheckboxChange: () => void;
}

const SwitchCheckbox: React.FC<SwitchCheckboxProps> = ({isChecked, onCheckboxChange}) => {
    return (
        <label className={styles["switch-checkbox"]}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
            />
            <span className={styles["slider"]}></span>
        </label>
    );
};

export default SwitchCheckbox;

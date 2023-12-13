import {FC, PropsWithChildren, ReactNode} from 'react';
import styles from './Popup.module.scss';
import XMarkIcon from "@/components/ui/icons/XMarkIcon.tsx";

export interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Popup: FC<PropsWithChildren<PopupProps>> = ({isOpen, onClose, children}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.popup__overlay} onClick={onClose}>
            <div className={styles.popup__container} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close__button} onClick={onClose}>
                    <XMarkIcon/>
                </button>
                <div className={styles.popup__body}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popup;
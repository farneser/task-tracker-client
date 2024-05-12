import {FC, PropsWithChildren, ReactNode} from 'react';
import styles from './Popup.module.scss';
import XMarkIcon from "@/components/ui/icons/XMarkIcon.tsx";

export interface PopupProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    extended?: boolean
}

const Popup: FC<PropsWithChildren<PopupProps>> = ({isOpen, onClose, children, extended}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.popup__overlay} onClick={onClose}>
            <div className={`${styles.popup__container} ${extended ? styles.popup__container_extend : ""}`}
                 onClick={(e) => e.stopPropagation()}>
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
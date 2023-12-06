import {FC, PropsWithChildren, ReactNode} from 'react';
import styles from './Popup.module.scss';

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
                {children}
                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
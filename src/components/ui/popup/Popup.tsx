import {FC, PropsWithChildren, ReactNode} from 'react';

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
        <div onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
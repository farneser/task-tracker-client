import {FC, PropsWithChildren, useState} from "react";
import Popup from "@/components/ui/popup/Popup.tsx";

interface PopupHook {
    isOpen: boolean;
    openPopup: () => void;
    Popup: FC<PropsWithChildren>;
    closePopup: () => void
    reversePopup: () => void
}

const usePopup: () => PopupHook = (): PopupHook => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const reversePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    const popup: FC<PropsWithChildren> = ({children}) => {
        return <Popup isOpen={isPopupOpen} onClose={closePopup}>
            {children}
        </Popup>;
    };

    return {
        isOpen: isPopupOpen,
        openPopup,
        closePopup,
        reversePopup,
        Popup: popup,
    };
};

export default usePopup;

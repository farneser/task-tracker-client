import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";

export interface ILayoutContext {
    isFooterVisible: boolean;
    isSidebarVisible: boolean;
    isSidebarToggled: boolean;
    isMobileWidth: boolean;
    isHeaderVisible: boolean;
    toggleSidebar: () => void;
    width: number;
}

export const LayoutContext = createContext<ILayoutContext | null>(null);

export const LayoutProvider: FC<PropsWithChildren> = ({children}) => {

    const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
    const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(false);
    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        handleResize()

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setIsMobileWidth(width < 768);

        if (!isSidebarToggled) {
            setIsSidebarVisible(width >= 768);
        }
    }, [isSidebarToggled, width]);

    useEffect(() => {
        setIsFooterVisible(!isMobileWidth || isSidebarVisible)
        setIsHeaderVisible((!isMobileWidth || !isSidebarVisible))
    }, [isSidebarVisible, isMobileWidth]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        setIsSidebarToggled(true);
    };

    return (
        <LayoutContext.Provider value={{
            isFooterVisible: isFooterVisible,
            isSidebarVisible: isSidebarVisible,
            isSidebarToggled: isSidebarToggled,
            isMobileWidth: isMobileWidth,
            isHeaderVisible: isHeaderVisible,
            toggleSidebar: toggleSidebar,
            width,
        }}>
            {children}
        </LayoutContext.Provider>
    );
};
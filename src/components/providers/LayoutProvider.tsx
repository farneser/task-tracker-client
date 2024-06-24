import {createContext, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export interface ILayoutContext {
    isFooterVisible: boolean;
    isSidebarVisible: boolean;
    isSidebarToggled: boolean;
    isMobileWidth: boolean;
    isHeaderVisible: boolean;
    toggleSidebar: () => void;
    isTextPage?: boolean;
}

export const LayoutContext = createContext<ILayoutContext | null>(null);

const isText = (path: string): boolean => path === '/' || path === '/p' || path.startsWith('/auth');

export const LayoutProvider: FC<PropsWithChildren> = ({children}) => {
    const {pathname} = useLocation();

    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth < 768);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isTextPage, setIsTextPage] = useState(isText(pathname));

    const handleResize = useCallback(() => {
        const newWidth = window.innerWidth;
        const newIsMobileWidth = newWidth < 768;
        const newIsSidebarVisible = newWidth >= 768;

        if (isMobileWidth !== newIsMobileWidth) {
            setIsMobileWidth(newIsMobileWidth);
        }

        if (!isSidebarToggled && isSidebarVisible !== newIsSidebarVisible) {
            setIsSidebarVisible(newIsSidebarVisible);
        }
    }, [isMobileWidth, isSidebarToggled, isSidebarVisible]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    useEffect(() => {
        setIsTextPage(isText(pathname));
    }, [pathname]);

    useEffect(() => {
        setIsFooterVisible(!isMobileWidth || isSidebarVisible);
        setIsHeaderVisible(!isMobileWidth || !isSidebarVisible);
    }, [isMobileWidth, isSidebarVisible]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        setIsSidebarToggled(true);
    };

    const contextValue: ILayoutContext = {
        isFooterVisible,
        isSidebarVisible,
        isSidebarToggled,
        isMobileWidth,
        isHeaderVisible,
        toggleSidebar,
        isTextPage
    };

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};
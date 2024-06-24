import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export interface ILayoutContext {
    isFooterVisible: boolean;
    isSidebarVisible: boolean;
    isSidebarToggled: boolean;
    isMobileWidth: boolean;
    isHeaderVisible: boolean;
    toggleSidebar: () => void;
    width: number;
    isTextPage?: boolean;
}

export const LayoutContext = createContext<ILayoutContext | null>(null);

const isText = (path: string): boolean => path === '/' || path === '/p' || path.startsWith('/auth');

export const LayoutProvider: FC<PropsWithChildren> = ({children}) => {

    const [isFooterVisible, setIsFooterVisible] = useState<boolean>(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
    const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(false);
    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const {pathname} = useLocation();
    const [isTextPage, setIsTextPage] = useState(isText(pathname));

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
        setIsTextPage(isText(pathname));
    }, [pathname]);

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
            width, isTextPage
        }}>
            {children}
        </LayoutContext.Provider>
    );
};
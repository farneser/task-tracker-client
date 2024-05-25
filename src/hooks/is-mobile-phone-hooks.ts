import {useEffect, useState} from 'react';

/**
 @author [Sh1wOo](https://github.com/DevsFromBels/project-titan/blob/b55598d1fa851fab8931f8aad24feb19766e94b6/web/src/shared/hooks/is-mobile-phone-hooks.ts)
 */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const deviceMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /iBlackberry/i,
            /Windows Phone/i,
            /Mobile/i,
        ];

        const handleResize = () => {
            setIsMobile(deviceMatch.some((regExp) => navigator.userAgent.match(regExp)));
            setIsLoading(false);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {isMobile, isLoading};
};

export default useIsMobile;
import {useContext} from "react";
import {ILayoutContext, LayoutContext} from "@/components/providers/LayoutProvider.tsx";

const useLayout = (): ILayoutContext => {
    const context = useContext(LayoutContext);

    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }

    return context;
};

export default useLayout;
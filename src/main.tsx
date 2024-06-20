import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import "@/styles/global.scss";
import {LocalizationProvider} from "@/components/providers/LocalizationProvider.tsx";
import {LayoutProvider} from "@/components/providers/LayoutProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <LayoutProvider>
        <LocalizationProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </LocalizationProvider>
    </LayoutProvider>
)

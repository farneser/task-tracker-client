import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import "@/styles/global.scss";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App/>
    </AuthProvider>
)

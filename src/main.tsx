import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import './global.css'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App/>
    </AuthProvider>
)

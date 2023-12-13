import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import "@/styles/global.scss";
import {ColumnProvider} from "@/components/providers/ColumnProvider.tsx";
import {TaskProvider} from "@/components/providers/TaskProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ColumnProvider>
            <TaskProvider>
                <App/>
            </TaskProvider>
        </ColumnProvider>
    </AuthProvider>
)

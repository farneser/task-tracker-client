import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import "@/styles/global.scss";
import {ColumnProvider} from "@/components/providers/ColumnProvider.tsx";
import {TaskProvider} from "@/components/providers/TaskProvider.tsx";
import {ProjectProvider} from "@/components/providers/ProjectProvider.tsx";
import LocalizationProvider from "@/components/providers/LocalizationProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <LocalizationProvider>
        <AuthProvider>
            <ProjectProvider>
                <ColumnProvider>
                    <TaskProvider>
                        <App/>
                    </TaskProvider>
                </ColumnProvider>
            </ProjectProvider>
        </AuthProvider>
    </LocalizationProvider>
)

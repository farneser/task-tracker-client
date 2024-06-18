import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "@/components/providers/AuthProvider.tsx";
import "@/styles/global.scss";
import {StatusProvider} from "@/components/providers/StatusProvider.tsx";
import {TaskProvider} from "@/components/providers/TaskProvider.tsx";
import {ProjectProvider} from "@/components/providers/ProjectProvider.tsx";
import {LocalizationProvider} from "@/components/providers/LocalizationProvider.tsx";
import {ProjectMemberProvider} from "@/components/providers/ProjectMemberProvider.tsx";
import {LayoutProvider} from "@/components/providers/LayoutProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <LayoutProvider>
        <LocalizationProvider>
            <AuthProvider>
                <ProjectProvider>
                    <ProjectMemberProvider>
                        <StatusProvider>
                            <TaskProvider>
                                <App/>
                            </TaskProvider>
                        </StatusProvider>
                    </ProjectMemberProvider>
                </ProjectProvider>
            </AuthProvider>
        </LocalizationProvider>
    </LayoutProvider>
)

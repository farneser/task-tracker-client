import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Layout from "@/components/ui/layout/default/Layout.tsx";
import LoginPage from "@/components/pages/auth/login/LoginPage.tsx";
import RequireAuth from "@/components/ui/layout/auth/RequireAuth.tsx";
import RegisterPage from "@/components/pages/auth/register/RegisterPage.tsx";
import ConfirmPage from "@/components/pages/tokens/confirm/ConfirmPage.tsx";
import ProjectsPage from "@/components/pages/project/ProjectsPage.tsx";
import WelcomePage from "@/components/pages/WelcomePage.tsx";
import ProjectPage from "@/components/pages/project/id/ProjectPage.tsx";
import type {Router} from "@remix-run/router/dist/router";
import {FC} from "react";
import AcceptInvitePage from "@/components/pages/tokens/invites/AcceptInvitePage.tsx";
import {ProjectIdProvider} from "@/components/providers/ProjectIdProvider.tsx";

const router: Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/* public rotes */}
            <Route index element={<WelcomePage/>}/>
            <Route path="/confirm" element={<ConfirmPage/>}/>
            <Route path="/auth/login" element={<LoginPage/>}/>
            <Route path="/auth/register" element={<RegisterPage/>}/>
            <Route path="/i/accept" element={<AcceptInvitePage/>}/>

            {/* private routes */}
            <Route element={
                <ProjectIdProvider>
                    <RequireAuth/>
                </ProjectIdProvider>
            }>
                <Route path="/p" element={<ProjectsPage/>}/>
                <Route path="/p/:projectId" element={
                    <ProjectPage/>
                }/>
            </Route>

        </Route>
    )
);

const App: FC = () => {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Layout from "@/components/ui/layout/default/Layout.tsx";
import LoginPage from "@/components/pages/auth/login/LoginPage.tsx";
import RequireAuth from "@/components/ui/layout/auth/RequireAuth.tsx";
import RegisterPage from "@/components/pages/auth/register/RegisterPage.tsx";
import ConfirmPage from "@/components/pages/confirm/ConfirmPage.tsx";
import ProjectsPage from "@/components/pages/project/ProjectsPage.tsx";
import WelcomePage from "@/components/pages/WelcomePage.tsx";
import ProjectPage from "@/components/pages/project/id/ProjectPage.tsx";
import type {Router} from "@remix-run/router/dist/router";
import {FC} from "react";

const router: Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/* public rotes */}
            <Route index element={<WelcomePage/>}/>
            <Route path="/confirm" element={<ConfirmPage/>}/>
            <Route path="/auth/login" element={<LoginPage/>}/>
            <Route path="/auth/register" element={<RegisterPage/>}/>

            {/* private routes */}
            <Route element={<RequireAuth/>}>
                <Route path="/p" element={<ProjectsPage/>}/>
                <Route path="/p/:projectId" element={<ProjectPage/>}/>
            </Route>
        </Route>
    )
);

const App: FC = () => {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App

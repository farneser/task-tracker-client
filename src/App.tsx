import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Layout from "@/components/ui/layout/default/Layout.tsx";
import LoginPage from "@/components/pages/auth/login/LoginPage.tsx";
import RequireAuth from "@/components/ui/layout/auth/RequireAuth.tsx";
import RootPage from "@/components/pages/RootPage.tsx";
import RegisterPage from "@/components/pages/auth/register/RegisterPage.tsx";
import ConfirmPage from "@/components/pages/ConfirmPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/* public rotes */}
            <Route path="/confirm" element={<ConfirmPage/>}/>
            <Route path="/auth/login" element={<LoginPage/>}/>
            <Route path="/auth/register" element={<RegisterPage/>}/>

            {/* private routes */}
            <Route element={<RequireAuth/>}>
                <Route index element={<RootPage/>}/>
            </Route>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App

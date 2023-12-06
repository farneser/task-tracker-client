import {FC} from "react";
import LoginForm from "@/components/ui/auth/loginForm/LoginForm.tsx";
import {ILogin} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";

const LoginPage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: ILogin) => {
        auth.updateToken(null)

        authService.login(data)
            .then(data => {
                auth.updateToken(data)
                navigate("/")

                return data;
            })
            .catch(e => console.log(e))
    }


    return (
        <div>
            login page
            <LoginForm onSubmit={onSubmit}/>
            <Link to={"/auth/register"}>Don't have an account?</Link>
        </div>
    );
};

export default LoginPage;

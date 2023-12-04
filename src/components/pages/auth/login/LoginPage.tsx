import {FC} from "react";
import LoginForm from "@/components/ui/auth/loginForm/LoginForm.tsx";
import {ILogin} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import useAuth from "@/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

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
            links
        </div>
    );
};

export default LoginPage;

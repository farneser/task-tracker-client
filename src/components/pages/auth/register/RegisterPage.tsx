import {FC} from "react";
import RegisterForm from "@/components/ui/auth/registerForm/RegisterForm.tsx";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {IRegister} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";

const RegisterPage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: IRegister) => {
        auth.updateToken(null)

        authService.register(data)
            .then(data => {
                auth.updateToken(data)
                navigate("/auth/login")

                return data;
            })
            .catch(e => console.log(e))
    }


    return (
        <div>
            Register page
            <RegisterForm onSubmit={onSubmit}/>
            <Link to={"/auth/login"}>Already have an account?</Link>
        </div>
    );
};

export default RegisterPage;

import {NextPage} from 'next';
import LoginForm from "@/src/components/pages/auth/login/form/LoginForm";

const LoginPage: NextPage = () => {
    return (
        <div>
            login page
            <LoginForm/>
            links
        </div>
    );
};

export default LoginPage;

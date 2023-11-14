import {useForm} from 'react-hook-form';
import styles from "./login-form.module.scss"
import {FC, useState} from "react";
import authService from "@/services/auth/auth.service.ts";
import {ILogin} from "@/services/auth/auth.types.ts";
import useAuth from "@/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = () => {
    const {register, handleSubmit, formState: {errors},} = useForm<ILogin>();
    const [loading, setLoading] = useState<boolean>(false)
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: ILogin) => {
        setLoading(true)
        auth.updateToken(null)

        authService.login(data)
            .then(data => {
                auth.updateToken(data)
                navigate("/")
                return data;
            })
            .catch(e => console.log(e))
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <div>loading</div>
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                placeholder="Email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'},
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
                {...register('password', {
                    required: 'Password is required',
                    maxLength: {value: 64, message: 'Password is too long'},
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input type="submit"/>
        </form>
    );
};

export default LoginForm;

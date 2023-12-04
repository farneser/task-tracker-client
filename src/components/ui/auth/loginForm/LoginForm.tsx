import {useForm} from 'react-hook-form';
import styles from "./login-form.module.scss"
import {FC, useState} from "react";
import {ILogin} from "@/services/auth/auth.types.ts";

type LoginFormProps = {
    onSubmit: (data: ILogin) => void;
}

const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
    const {register, handleSubmit, formState: {errors},} = useForm<ILogin>();
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async (data: ILogin) => {
        setLoading(true)
        onSubmit(data)
        setLoading(false)
    }

    if (loading) {
        return <div>loading</div>
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
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
                    minLength: {value: 8, message: 'Password is too short'},
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input type="submit"/>
        </form>
    );
};

export default LoginForm;

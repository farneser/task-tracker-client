"use client"
import {NextPage} from 'next';
import {useForm} from 'react-hook-form';
import styles from "./login-form.module.scss"

interface LoginForm {
    email: string;
    password: string;
}

const LoginForm: NextPage = () => {
    const {register, handleSubmit, formState: {errors},} = useForm<LoginForm>();
    const onSubmit = (data: LoginForm) => console.log(data);

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

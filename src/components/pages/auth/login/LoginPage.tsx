import {FC, useState} from "react";
import {ILogin} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Message} from "@/models/Message.ts";
import {errorMessages} from "@/components/pages/auth/errors.ts";


const LoginPage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILogin>();
    const [error, setError] = useState<Message | null>(null)

    const onSubmit = async (data: ILogin) => {
        auth.updateToken(null)

        authService.login(data)
            .then(data => {
                auth.updateToken(data)
                navigate("/")

                return data;
            })
            .catch(e => {
                setError(e.response.data)
            })
    }

    return (
        <div className="page">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>Login page</h1>
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        className="form__input"
                        {...register('login', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.login && <p className="form__error">{errors.login.message}</p>}
                </div>

                <div>
                    <label className="form__label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="form__input"
                        {...register('password', {
                            required: 'Password is required',
                            maxLength: {
                                value: 64,
                                message: 'Password is too long',
                            },
                            minLength: {
                                value: 8,
                                message: 'Password is too short',
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="form__error">{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <button type="submit" className="form__button">
                        Submit
                    </button>
                </div>
                <div className="form__link">
                    <Link to={"/auth/register"}>Don't have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

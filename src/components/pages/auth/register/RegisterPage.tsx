import {FC, useState} from "react";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {IRegister} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import "../auth.scss";
import {useForm} from "react-hook-form";
import {Message} from "@/models/Message.ts";
import {errorMessages} from "@/components/pages/auth/errors.ts";

const RegisterPage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IRegister>();
    const [error, setError] = useState<Message | null>(null)

    const onSubmit = async (data: IRegister) => {
        auth.updateToken(null)

        authService.register(data)
            .then(data => {
                auth.updateToken(data)
                navigate("/auth/login")

                return data;
            })
            .catch(e => setError(e.response.data))
    }

    return (
        <div className="page">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>Register page</h1>
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        className="form__input"
                        {...register('username', {
                            required: 'Username is required',
                            minLength: 1,
                            maxLength: 255
                        })}
                    />
                    {errors.username && <p className="form__error">{errors.username.message}</p>}
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        className="form__input"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <p className="form__error">{errors.email.message}</p>}
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
                    <label className="form__label">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form__input"
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
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
                    {errors.confirmPassword && (
                        <p className="form__error">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div>
                    <button type="submit" className="form__button">
                        Submit
                    </button>
                </div>
                <div className="form__link">
                    <Link to={"/auth/login"}>Already have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;

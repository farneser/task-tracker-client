import {FC, useState} from "react";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {IRegister} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import "../auth.scss";
import {useForm} from "react-hook-form";
import {Message} from "@/models/Message.ts";
import {errorMessages} from "@/components/pages/auth/errors.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

const RegisterPage: FC = () => {
    const {translations} = useLocalization();

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
                    <h1>{translations.registerPage.heading}</h1>
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">{translations.registerPage.username.label}</label>
                    <input
                        type="text"
                        placeholder={translations.registerPage.username.placeholder}
                        className="form__input"
                        {...register('username', {
                            required: translations.registerPage.username.required,
                            minLength: {
                                value: 4,
                                message: translations.registerPage.username.minLength
                            },
                            maxLength: {
                                value: 64,
                                message: translations.registerPage.username.maxLength
                            }
                        })}
                    />
                    {errors.username && <p className="form__error">{errors.username.message}</p>}
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">{translations.registerPage.email.label}</label>
                    <input
                        type="text"
                        placeholder={translations.registerPage.email.placeholder}
                        className="form__input"
                        {...register('email', {
                            required: translations.registerPage.email.required,
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: translations.registerPage.email.invalid,
                            },
                        })}
                    />
                    {errors.email && <p className="form__error">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="form__label">{translations.registerPage.password.label}</label>
                    <input
                        type="password"
                        placeholder={translations.registerPage.password.placeholder}
                        className="form__input"
                        {...register('password', {
                            required: translations.registerPage.password.required,
                            maxLength: {
                                value: 64,
                                message: translations.registerPage.password.maxLength,
                            },
                            minLength: {
                                value: 8,
                                message: translations.registerPage.password.minLength
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="form__error">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label className="form__label">{translations.registerPage.confirmPassword.label}</label>
                    <input
                        type="password"
                        placeholder={translations.registerPage.confirmPassword.placeholder}
                        className="form__input"
                        {...register('confirmPassword', {
                            required: translations.registerPage.confirmPassword.required,
                            maxLength: {
                                value: 64,
                                message: translations.registerPage.confirmPassword.maxLength
                            },
                            minLength: {
                                value: 8,
                                message: translations.registerPage.confirmPassword.minLength
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="form__error">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div>
                    <button type="submit" className="form__button">
                        {translations.registerPage.submit}
                    </button>
                </div>
                <div className="form__link">
                    <Link to={"/auth/login"}>{translations.registerPage.accountAlreadyExists}</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;

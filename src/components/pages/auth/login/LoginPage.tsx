import {FC, useEffect, useState} from "react";
import {ILogin} from "@/services/auth/auth.types.ts";
import authService from "@/services/auth/auth.service.ts";
import useAuth from "@/hooks/useAuth.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Message} from "@/models/Message.ts";
import {errorMessages} from "@/components/pages/auth/errors.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

const LoginPage: FC = () => {
    const {translations} = useLocalization();

    const auth = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILogin>();
    const [error, setError] = useState<Message | null>(null)
    const [redirect, setRedirect] = useState<string>("/p")
    const location = useLocation();

    useEffect(() => {
            const params = new URLSearchParams(location.search);

            if (params.get('redirect') != undefined) {
                setRedirect(`${params.get('redirect')}`)
            }
        }, [location.search]
    );

    const onSubmit = async (data: ILogin) => {
        auth.updateToken(null)

        authService.login(data)
            .then(data => {
                auth.updateToken(data)
                navigate(redirect ?? "/")

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
                    <h1>{translations.loginPage.heading}</h1>
                </div>
                <div>
                    {error && <p className="form__error">
                        {errorMessages[`${error.status}`] || error.message}</p>}
                    <label className="form__label">{translations.loginPage.login.label}</label>
                    <input
                        type="text"
                        placeholder={translations.loginPage.login.placeholder}
                        className="form__input"
                        {...register('login', {
                            required: translations.loginPage.login.required,
                            minLength: {
                                value: 1,
                                message: translations.loginPage.login.minLength
                            },
                            maxLength: {
                                value: 255,
                                message: translations.loginPage.login.maxLength
                            }
                        })}
                    />
                    {errors.login && <p className="form__error">{errors.login.message}</p>}
                </div>

                <div>
                    <label className="form__label">{translations.loginPage.password.label}</label>
                    <input
                        type="password"
                        placeholder={translations.loginPage.password.placeholder}
                        className="form__input"
                        {...register('password', {
                            required: translations.loginPage.password.required,
                            maxLength: {
                                value: 64,
                                message: translations.loginPage.password.maxLength,
                            },
                            minLength: {
                                value: 8,
                                message: translations.loginPage.password.minLength,
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="form__error">{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <button type="submit" className="form__button">
                        {translations.loginPage.submit}
                    </button>
                </div>
                <div className="form__link">
                    <Link to={"/auth/register"}>{translations.loginPage.accountNotExists}</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

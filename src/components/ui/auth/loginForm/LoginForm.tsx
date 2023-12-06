import {useForm} from 'react-hook-form';
import {FC} from 'react';
import {ILogin} from '@/services/auth/auth.types.ts';
import '../auth.scss';

type LoginFormProps = {
    onSubmit: (data: ILogin) => void;
};

const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILogin>();

    const submit = async (data: ILogin) => {
        onSubmit(data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
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
                    <p className="error-message">{errors.password.message}</p>
                )}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;

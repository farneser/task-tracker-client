import {useForm} from 'react-hook-form';
import {FC} from 'react';
import {IRegister} from '@/services/auth/auth.types.ts';
import '../auth.scss';

type RegisterFormProps = {
    onSubmit: (data: IRegister) => void;
};

const RegisterForm: FC<RegisterFormProps> = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IRegister>();

    const submit = async (data: IRegister) => {
        onSubmit(data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(submit)}>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
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
                    <p>{errors.password.message}</p>
                )}
            </div>

            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
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
                {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default RegisterForm;

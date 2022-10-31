import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const [emailOrUserName, setEmailOrUserName] = useState('');
    const { dataStore } = useContext(AuthContext);
    const { token, setToken, user, setUser } = dataStore;

    useEffect(() => {
        if (token) {
            navigate(from);
        }
    }, [token, navigate, from]);

    const onSubmitParam = async data => {
        const { email_or_username, password } = data;
        const url = 'http://localhost:5000/api/v1/auth/user/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email_or_username,
                email: email_or_username,
                password
            })
        });
        const dataResponse = await response.json();
        console.log(dataResponse);
        if (!dataResponse.success) {
            console.log(dataResponse.message);
            return;
        }
        const { token, user } = dataResponse;
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate(from, { replace: true });
    }

    return (
        <div className='md:mt-12 mb-10 w-full md:w-1/2 mx-auto custom-shadow bg-[#e8eaec] pt-10 pb-10 px-10 rounded-lg'>
            <h1 className='text-2xl md:text-3xl font-medium text-slate-500 text-center mb-10'>Please Login to Continue</h1>
            <form onSubmit={handleSubmit(onSubmitParam)}>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required=""
                        {...register("email_or_username", {
                            required: 'Email or User name is required',
                        })}
                        onKeyUp={(e) => {
                            trigger('email_or_username')
                            setEmailOrUserName(e.target.value)
                        }}
                    />
                    <p className='text-red-500 text-sm'>{errors?.email_or_username?.message}</p>

                    <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email or user name</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required=""
                        {...register('password', {
                            required: 'Password is required'
                        })}
                        onKeyUp={() => {
                            trigger('password')
                        }}
                    />
                    <p className='text-red-500 text-sm'>{errors?.password?.message}</p>

                    <label htmlFor="floating_password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                <button type="submit" className="text-black border-2 border-black hover:border-2 hover:border-primary hover:bg-gradient hover:from-white hover:to-white hover:text-primary transition-all transition-duration:150ms md:w-1/4 font-medium hover:font-medium px-5 py-2 rounded-md">Login</button>

                <div className="flex flex-col">
                    <p className='text-sm md:text-base font-medium mt-5 text-slate-600'>New in Chat? <Link className='text-blue-700 underline' to={'/register'}>Join Now</Link></p>
                    <p className='text-sm md:text-base font-medium text-slate-600 mt-2'>Forgot password? <Link className='text-blue-700 underline' to={'/login'}>Reset password</Link></p>
                </div>

            </form>
            <div className="divider">OR</div>
            <div className="text-center">
                <button className='flex items-center mx-auto google-button rounded-lg btn-primary btn-outline'><p className='ml-2 text-lg'>Signin with Google</p></button>
            </div>
        </div>
    );
};

export default Login;
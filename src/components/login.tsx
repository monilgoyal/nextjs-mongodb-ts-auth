import React, { FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
// import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
// import Link from "next/link";
import useServerRefresher from "../../src/hooks/useServerRefresher";
import redaxios from 'redaxios'

export default function Login() {
    interface errors {
        email: boolean;
        invalidEmail: boolean;
        password: boolean;
    }
    useEffect(() => {
        document.body.classList.add('bg-primary');
    })
    const [errors, setErrors] = useState<errors>({
        email: false,
        invalidEmail: false,
        password: false,
    })
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const handleValidation = () => {
        let tempErrors: errors = {
            email: false,
            invalidEmail: false,
            password: false,
        }

        let isValid = true;

        if (!validateEmail(email)) {
            tempErrors.invalidEmail = true
            isValid = false;
        }

        if (password.length <= 4) {
            tempErrors.password = true
            isValid = false;
        }

        if (email.length <= 0) {
            tempErrors.email = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        return isValid;
    };
    const handleErrorPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.length > 4) {
            setErrors({ ...errors, password: false });
        }
    }
    const handleErrorEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.length > 0) {
            setErrors({ ...errors, email: false, invalidEmail: false });
        }

    }
    // const {
    //     handleSubmit,
    //     register,
    //     formState: { errors },
    // } = useForm();
    const {
        isLoading,
        isError,
        mutate: loginMutation,
    } = useMutation(() => redaxios.post("/api/session", { email, password }), {
        onSuccess: useServerRefresher(),
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let isValidForm = handleValidation();
        if (isValidForm) {
            loginMutation();
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className='w-screen h-screen bg-primary flex flex-col justify-center align-middle'>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image className='-z-10 opacity-[.03]' src="/bg.png" width={450} height={700} objectFit='contain' alt='monil goyal'></Image>
                    {/* <img src="/bg.png" alt="logo" className='-z-10 opacity-[.03]' width={450} height={700} /> */}
                </div>
                <div className="text-white w-[29%] min-w-[240px] max-w-[450px] self-center ">

                    <form className="relative" onSubmit={(e) => handleSubmit(e)}>
                        <div className='text-5xl font-semibold dark:text-white self-center text-center'>Sign in</div>
                        <div className="my-0 pt-5 mb-5 -mx-9">
                            <div className='flex flex-col py-1 px-10 w-full'>
                                <span className='  text-sm font-thin text-center self-center translate-y-4 bg-primary'>
                                    Email Address
                                </span>
                                <div className='my-2'>
                                    <input type="text" className={'py-2 px-7 border w-full block outline-none border-solid h-14 bg-transparent border-white  focus:border-b-2 placeholder:text-secondary text-lg'.concat(' ', errors['email'] || errors['invalidEmail'] ? 'border-red-500 ' : 'border-gray-300 focus:border-gray-400')} placeholder='Enter Email'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleErrorEmail(e)} />
                                </div>
                                <div className={errors['email'] || errors.invalidEmail ? 'visible' : 'hidden'}>
                                    {/* <AiOutlineExclamationCircle className='text-red-500 text-xl inline' />&nbsp; */}
                                    <p className='text-sm font-medium text-red-500 inline'>{errors['email'] ? 'Please provide your email' : errors['invalidEmail'] ? 'Invalid Email' : ''}</p>
                                </div>
                            </div>
                            <div className='flex-col py-1 px-10 w-full flex'>
                                <span className='  text-sm font-thin text-center self-center translate-y-4 bg-primary'>
                                    Password
                                </span>
                                <div className='my-2'>
                                    <input type="password" className={'py-2 px-7 border w-full block outline-none border-solid text-lg h-14 bg-transparent border-white  focus:border-b-2 placeholder:text-secondary '.concat(' ', errors.invalidEmail ? 'border-red-500 ' : 'border-gray-300 focus:border-gray-400')} placeholder='Enter Password'
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleErrorPassword(e)} />
                                </div>
                                <div className={errors.password ? 'visible' : 'hidden'}>
                                    {/* <AiOutlineExclamationCircle className='text-red-500 text-xl inline' />&nbsp; */}
                                    <p className='text-sm font-medium text-red-500 inline'>Passoword should be 5 character long</p>
                                </div>
                            </div>

                            <div className='mx-8 mt-10'>
                                <button type='submit' className=" flex items-center justify-center px-4 py-4 border w-[180px] border-transparent shadow-sm text-xl font-bold text-primary bg-white mx-auto"> Sign in </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="space-y-8">
                <h1 className="self-start text-xl">Login</h1>
                
                <label className="flex flex-col" htmlFor="email">
                Email
                <input type="text" {...register("email", { required: true})} />
                </label>
                
                <label className="flex flex-col" htmlFor="password">
                Password
                <input
                type="password"
                {...register("password", { required: true })}
                />
                </label>
                
                <button
                className="u-button"
                type="submit"
                disabled={Object.keys(errors).length > 0 || isLoading}
                >
                Login
                </button>
                
                {isError && <p>User password combination not found</p>}
                
                <Link href="/signup">
                <a className="block underline" href="/signup">
                Sign up
                </a>
                </Link>
            </div> */}
        </>
    );
}
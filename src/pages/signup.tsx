import React, { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { useMutation } from "react-query";
import useServerRefresher from "../../src/hooks/useServerRefresher";
import { userFromRequest } from "../../src/web/tokens";
import redaxios from 'redaxios'

export default function SignUp() {
    interface errors {
        userName: boolean;
        email: boolean;
        invalidEmail: boolean;
        password: boolean;
        terms: boolean;
    }
    useEffect(() => {
        document.body.classList.add('bg-primary');
    })
    const [errors, setErrors] = useState<errors>({
        userName: false,
        email: false,
        invalidEmail: false,
        password: false,
        terms: false
    })
    const [userName, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const handleValidation = () => {
        let tempErrors: errors = {
            userName: false,
            email: false,
            invalidEmail: false,
            password: false,
            terms: false
        }

        let isValid = true;

        if (userName.length <= 0) {
            tempErrors.userName = true;
            isValid = false;
        }
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
        if (checked === false) {
            tempErrors.terms = true;
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
    const handleErrorUserName = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.length > 0) {
            setErrors({ ...errors, userName: false });
        }
    }
    const handleErrorEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).value.length > 0) {
            setErrors({ ...errors, email: false, invalidEmail: false });
        }

    }



    const handleCheckedBox = () => {
        if (!checked) {
            setErrors({ ...errors, terms: false })
        }
        setChecked(!checked)
    }
    const {
        isLoading,
        isError,
        mutate: createUserMutation,
    } = useMutation(() => redaxios.post("/api/register", { name: userName, email, password }), {
        onSuccess: useServerRefresher(),
    });
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let isValidForm = handleValidation();
        if (isValidForm) {
            createUserMutation()
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className='w-screen h-screen flex flex-col justify-center align-middle'>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image className='-z-10 opacity-[.03]' src="/bg.png" width={450} height={700} objectFit='contain' alt='monil goyal'></Image>
                </div>
                <div className="text-white w-[29%] min-w-[240px] max-w-[450px] self-center ">

                    <form className="relative" onSubmit={(e) => handleSubmit(e)}>
                        <div className='text-5xl font-semibold dark:text-white self-center text-center'>Sign up</div>
                        <div className="my-0 pt-5 mb-5 -mx-9">
                            <div className='flex flex-col py-1 px-10 mt-5 w-full'>
                                <span className='  text-sm font-thin text-center self-center translate-y-4 bg-primary'>
                                    Username
                                </span>
                                <div className='my-2'>
                                    <input type="text" className={'py-2 px-7 border w-full block outline-none border-solid text-lg h-14 bg-transparent border-white  focus:border-b-2 placeholder:text-secondary'.concat(' ', errors['userName'] ? 'border-red-500 ' : 'border-gray-300 focus:border-gray-400')} placeholder='Enter Name'
                                        value={userName}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleErrorUserName(e)} />
                                </div>
                                <div className={errors.userName ? 'visible' : 'hidden'}>
                                    <p className='text-sm font-medium text-red-500 inline'>Username is must</p>
                                </div>
                            </div>
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
                                    <p className='text-sm font-medium text-red-500 inline'>Passoword should be 5 character long</p>
                                </div>
                            </div>
                            <div className='flex-col py-1 px-10 w-full flex relative'>
                                <div className="flex items-center mr-4 mb-2">
                                    <input type="checkbox" id="A3-yes" name="A3-confirmation" value="yes" className="opacity-0 absolute h-8 w-8" onChange={handleCheckedBox} />
                                    <div className="bg-transparent border border-white w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2">
                                        <svg className={"fill-current w-3 h-3 text-blue-600 pointer-events-none".concat(' ', checked ? 'block' : 'hidden')} version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fillRule="evenodd">
                                                <g transform="translate(-9 -11)" fill="white" fillRule="nonzero">
                                                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <label htmlFor="A3-yes" className="text-sm font-thin">I accept the terms & conditions</label>

                                </div>
                                <div className={!errors.email && !errors.invalidEmail && !errors.password && !errors.userName && errors.terms ? 'visible' : 'hidden'}>
                                    <p className='text-sm font-medium text-red-500 inline'>Please accept terms and conditions</p>
                                </div>
                            </div>
                            <div className='mx-8 mt-10'>
                                <button type='submit' className=" flex items-center justify-center px-4 py-4 border w-[180px] border-transparent shadow-sm text-xl font-bold text-primary bg-white mx-auto"> Sign up </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = await userFromRequest(context.req);

    if (user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
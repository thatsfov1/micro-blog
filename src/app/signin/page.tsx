"use client"
import React, {useRef, useState} from 'react'
import {useForm} from "react-hook-form";
import {loginUser} from "@/api/api";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Signin = () => {
    const [serverErr, setServerErr] = useState('');
    const form = useRef(null)
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm();

    const router = useRouter()

    const handleLogin = async (data) => {
        if (form.current) {
            try {
                const result = await loginUser(data)
                    localStorage.setItem('token', result.access_token)
                    router.push('/')
            } catch (err) {
                setServerErr(err.message)
                reset();
            }
        }
    };
    return (
        <div className='w-screen flex justify-center '>
            <form ref={form}
                  onSubmit={handleSubmit(handleLogin)}
                  className='form'>
                <h1 className='text-center text-xl font-bold'>Sign In</h1>
                {serverErr && <span className='err'>{serverErr}</span>}
                {errors.email && (
                    <span className='err'>
                        {errors.email?.message}
                    </span>
                )}
                <label>Email</label>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email is incorrect",
                        },
                        minLength: {
                            value: 7,
                            message: "Email is too short",
                        },
                    })}
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                />

                {errors.password && (
                    <span className='err'>
                        {errors.password?.message}
                    </span>
                )}
                <label>Password</label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password is too short",
                        },
                        pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: "Password should contain only numbers and letters",
                        },
                    })}
                    type={"password"}
                    name="password"
                    placeholder="************"
                />
                <div>
                    Dont have an account? <Link className='text-blue-500' href='/signup'>Create one</Link>
                </div>
                <button className="mt-5 w-full btn" type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}

export default Signin

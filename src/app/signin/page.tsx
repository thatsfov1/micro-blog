"use client"
import React, {useRef} from 'react'
import {useForm} from "react-hook-form";

const Signin = () => {

    const form = useRef(null)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const handleLogin = async (data) => {
        if (form.current) {
            try {
                console.log(data)
            } catch (err) {
                console.log(err);
                reset();
            }
        }
    };
    return (
        <div className='w-screen flex justify-center '>

            <form ref={form}
                  onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-2 w-72 items-center p-8 rounded-lg shadow-lg mt-12'>
                <h1 className='text-center text-xl font-bold'>Sign In</h1>
                {errors.email && (
                    <div>
                        {errors.email?.message}
                    </div>
                )}
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
                    <div>
                        {errors.password?.message}
                    </div>
                )}
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password is too short",
                        },
                    })}
                    type={"password"}
                    name="password"
                    placeholder="************"
                />
                <button className="mt-5" type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}

export default Signin

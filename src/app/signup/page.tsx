"use client"
import React, {useRef, useState} from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import {createUser} from "@/api/api";

const Signup = () => {
    const [serverErr, setServerErr] = useState('');
    const form = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter()

    const handleRegister = async (data)=>{
        if (form.current) {
            try {
                const result = await createUser(data)
                console.log(result)
                router.push('/signin')
            } catch (err) {
                setServerErr(err);
                reset();
            }
        }
    }
  return (
    <div className='w-screen flex justify-center items-center'>
        <form ref={form} onSubmit={handleSubmit(handleRegister)} className='form'>
            <h1 className='text-center text-xl font-bold'>Sign Up</h1>

            {serverErr && <span className='err'>{serverErr}</span>}

            {errors.name && <span className='err'>{errors.name.message}</span>}
            <label>Full Name</label>
            <input type="text" {...register("name", {
                required: "Your Full Name is required",
                minLength: {
                    value: 5,
                    message: "Your Full Name is too short",
                },
            })} name="name"
                   id="name"
                   placeholder="Your First and Last name" />


            {errors.email && <span className='err'>{errors.email.message}</span>}
            <label>Email</label>
            <input {...register("email", {
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
                   type="text"
                   name="email"
                   id="email"
                   placeholder="Enter your email address" />


            {errors.password && <span className='err'>{errors.password.message}</span>}
            <label>Password</label>
            <input {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password is too short",
                },
            })}
                   type={"password"}
                   name="password"
                   id="password"
                   placeholder="************" />


            <label>Role</label>
            <select {...register("role")}>
                <option value='admin'>Author</option>
                <option value="customer">Comentator</option>
            </select>
            <label>Avatar</label>
            <select {...register("avatar")}>
                <option value='https://i.imgur.com/yhW6Yw1.jpg'>1</option>
                <option value='https://i.imgur.com/yhW6Yw1.jpg'>2</option>
            </select>

            <button className="signup-btn mt-5" type="submit">
                Sign up
            </button>
        </form>
    </div>
  )
}

export default Signup

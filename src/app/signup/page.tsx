"use client"
import React, {useRef} from 'react'
import { useForm } from "react-hook-form";

const Signup = () => {
    const form = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleRegister =async (data)=>{
        if (form.current) {
            try {
                console.log(data);
            } catch (err) {
                console.log(err);
                console.log(data);
                reset();
            }
        }
    }

  return (
    <div className='w-screen flex justify-center items-center'>

        <form ref={form} onSubmit={handleSubmit(handleRegister)} className='flex flex-col gap-2 w-72 items-center p-8 rounded-lg shadow-lg mt-12'>
            <h1 className='text-center text-xl font-bold'>Sign Up</h1>
            <input type="text" {...register("fullName", {
                required: "Your Full Name is required",
                minLength: {
                    value: 5,
                    message: "Your Full Name is too short",
                },
            })} name="fullName"
                   id="fullName"
                   placeholder="Your First and Last name" />
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


            <select {...register("role")}>
                <option value="author">Author</option>
                <option value="comentator">Comentator</option>
            </select>

            {errors.checkboxesRequired && <p style={{ color: 'red' }}>{errors.checkboxesRequired.message}</p>}


            <button className="signup-btn mt-5" type="submit">
                Sign up
            </button>
        </form>
    </div>
  )
}

export default Signup

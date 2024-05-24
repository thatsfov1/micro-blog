"use client"
import React, {useRef, useState} from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import {checkEmail, createUser} from "@/api/api";

const Signup = () => {
    const [serverErr, setServerErr] = useState('');
    const form = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const router = useRouter()

    const handleRegister = async (data)=>{
        if (form.current) {
            try {
                // const isAvailable = await checkEmail(data?.email)
                // if(isAvailable){
                    const result = await createUser(data)
                    console.log(result)
                    router.push('/signin')
                // }else{
                //     setServerErr("This email already in usage")
                // }
            } catch (err) {
                setServerErr(err.message);
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
                   id="password"
                   placeholder="************" />


            <label>Role</label>
            <select {...register("role")}>
                <option value='admin'>Author</option>
                <option value="customer">Comentator</option>
            </select>
            <label>Avatar</label>
            <select {...register("avatar")}>
                <option value='https://img.freepik.com/free-photo/close-up-portrait-good-looking-serious-african-man-with-healthy-clean-skin-wearing-white-casual-t-shirt-posing-isolated-against-gray-wall-with-copy-space-your-promotional-content_273609-6064.jpg'>
                    Male</option>
                <option value='https://i.imgur.com/yhW6Yw1.jpg'>Female</option>
                <option value='https://masterpiecer-images.s3.yandex.net/0626fed86f6a11eeb060baea8797b5f2:upscaled'>Non binary</option>
            </select>

            <button className="signup-btn mt-5 btn" type="submit">
                Sign up
            </button>
        </form>
    </div>
  )
}

export default Signup

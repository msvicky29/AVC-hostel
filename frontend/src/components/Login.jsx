import React, { useState } from 'react'
import Logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {motion} from 'framer-motion'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password })
            
            if (response.data.success) {
                localStorage.setItem('token', `Bearer ${response.data.token}`)
                navigate('/dashboard')
            } else {
                alert('Invalid username or password')
            }
        } catch (err) {
            console.error('Login error:', err)
            // alert(err.response?.data?.message || 'Login failed')
            toast.error(err.response.data.message)
        }
    }

    return (
        <div>
            <section className="bg-white overflow-hidden">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <motion.aside
                    initial={{opacity:0,x:200}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.6}}
                    className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img alt src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="absolute inset-0 h-full w-full object-cover" />
                    </motion.aside>
                    <motion.main
                    initial={{opacity:0,x:-200}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.6}}                    
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className='flex w-full justify-center'>
                                <img src={Logo} className='w-32' />

                            </div>
                            <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                AVC College of Engineering
                            </h1>
                            <p className="mt-4 text-center leading-relaxed text-gray-500">
                                Hostel food menu manager for AVC College of engineering.
                            </p>
                            {/* <h1 className='text-center font-bold text-4xl mt-12'>Login</h1> */}
                            <form onSubmit={handleForm} className="mt-8 grid grid-cols-6 gap-6">

                                <div className="col-span-6">
                                    <label htmlFor="Email"  className="block text-sm font-medium text-gray-700"> Email </label>
                                    <input type="email" required id="Email" onChange={(e)=>setEmail(e.target.value)} name="email" className="mt-1 w-full px-3 py-4 border  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                                </div>
                                <div className="col-span-6 ">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                                    <input type="password" required  onChange={(e)=>setPassword(e.target.value)} id="Password" name="password" className="mt-1 px-3 py-4 border  w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                                </div>

                                <div className="col-span-6 flex justify-end">
                                    <Link
                                        to="/forgot-password" 
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                        Login
                                    </button>

                                </div>
                            </form>
                        </div>
                    </motion.main>
                </div>
            </section>
        </div>
    )
}

export default Login

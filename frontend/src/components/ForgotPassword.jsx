import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('https://avc-hostel.onrender.com/api/forgot-password', { email })
            console.log(response)
            if (response.data.success) {
                toast.success('Password reset link sent to your email!')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <motion.aside 
                initial={{opacity:0,y:-200}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.6}}
                className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img 
                        alt="Pattern" 
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </motion.aside>

                <motion.main 
                
                    initial={{opacity:0,y:200}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:0.6}}
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className='flex w-full justify-center'>
                            <img src={Logo} className='w-32' alt="College Logo" />
                        </div>

                        <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            AVC College of Engineering
                        </h1>

                        <div className="mt-8 bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                                Forgot Password
                            </h2>
                            <p className="text-center text-gray-600 mb-8">
                                Enter your email address to receive a password reset link
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>

                                <div className="text-center">
                                    <Link 
                                        to="/" 
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>Didn't receive the email? Check your spam folder or</p>
                            <p>contact support at support@avc.edu</p>
                        </div>
                    </div>
                </motion.main>
            </div>
        </section>
    )
}

export default ForgotPassword 
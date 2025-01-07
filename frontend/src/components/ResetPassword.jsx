import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Logo from '../assets/logo.jpg'
import {motion} from 'framer-motion'


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if (password.length<8){
            toast.error('Passwords length must above 8')
            return
        }
            
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            console.log(token); // Check the token value

            const response = await axios.post(`https://avc-hostel.onrender.com/api/reset-password/${token}`, {
                newPassword: password
            })
            console.log(response)
            if (response.data.success) {
                toast.success('Password reset successful!')
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
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
                            <img src={Logo} className='w-32' />

                        </div>
                        <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            AVC College of Engineering
                        </h1>
                        <p className="mt-4 text-center leading-relaxed text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">

                            <div className="col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700"> New password </label>
                                <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="mt-1 w-full px-3 py-4 border  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                            </div>
                            <div className="col-span-6 ">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700"> Confirm Password </label>
                                <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} id="confirmPassword" name="confirmPassword" className="mt-1 px-3 py-4 border  w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                            </div>
                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button type='submit' className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                    Reset Password
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

export default ResetPassword 
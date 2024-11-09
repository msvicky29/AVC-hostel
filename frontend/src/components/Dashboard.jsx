import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Logo from '../assets/logo.jpg'


const Dashboard = () => {

    const [mealData, setMealData] = useState({
        breakfast: '',
        lunch: '',
        dinner: ''
    });
    const [customMeals, setCustomMeals] = useState({
        breakfast: '',
        lunch: '',
        dinner: ''
    });
    const [finalMealData, setFinalMealData] = useState({
        breakfast: '',
        lunch: '',
        dinner: ''
    });

    useEffect(() => {
        setFinalMealData({
            breakfast: mealData.breakfast === 'others' ? customMeals.breakfast : mealData.breakfast,
            lunch: mealData.lunch === 'others' ? customMeals.lunch : mealData.lunch,
            dinner: mealData.dinner === 'others' ? customMeals.dinner : mealData.dinner
        });
    }, [mealData, customMeals]);
    const [currentMeal, setCurrentMeal] = useState({
        breakfast: '',
        lunch: '',
        dinner: ''
    })
    useEffect(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-meal')
            console.log(response)
            setCurrentMeal(response.data.data[0])
        }
        catch (err) {
            toast.error("Error in fetching menu")
        }
    }, [])


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(finalMealData)
        if (!finalMealData.breakfast || !finalMealData.lunch || !finalMealData.dinner) {
            toast.error('Please select all meals')
            return
        }
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(finalMealData.breakfast) || !regex.test(finalMealData.lunch) || !regex.test(finalMealData.dinner)) {
            toast.error('Meals should only contain letters and spaces')
            return
        }
        try {
            const response = await axios.patch(`http://localhost:5000/api/update-menu`, { finalMealData });
            console.log('Response:', response.data);
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        toast.success("Logged in successfully!", {
            position: "top-center",
            autoClose: 3000,
        })

    }, [])
    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }


    return (
        <div>
            <header className="lg:px-16 px-4 bg-gray-800 flex flex-wrap items-center py-4 shadow-md">
                <div className="flex-1 flex justify-between items-center">
                    <div className="flex gap-4">
                        <img src={Logo} alt="logo" className="w-20 h-20 rounded-full" />
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <h1 className="font-bold text-white  md:text-2xl">AVC College of Engineering</h1>
                            <p className="text-white text-sm">Mannampandal,Mayiladuthurai</p>
                        </div>

                    </div>

                </div>

                <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
                    <svg className="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle" />

                <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
                    <nav>
                        <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
                            <button
                                className="bg-red-600 hover:bg-red-700 font-semibold px-4 py-2 rounded-md text-white transition-colors duration-200 w-full md:w-auto flex items-center justify-center gap-2"
                                onClick={handleLogOut}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Log out
                            </button>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Add this CSS to make mobile menu work */}
            <style jsx>{`
                #menu-toggle:checked + #menu {
                    display: block;
                }
            `}</style>

            <div className="w-full bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Hostel Food Menu</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Select your preferred meals for today. Our kitchen staff ensures fresh and nutritious meals prepared with high-quality ingredients.
                        </p>
                    </motion.div>
                    <div className="bg-white p-6 border border-yellow-400 w-72 mx-auto  rounded-lg shadow-md mb-8">
                        <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Current Menu</h2>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Breakfast:</span>
                                <span className="text-gray-600">{currentMeal.breakfast.charAt(0).toUpperCase() + currentMeal.breakfast.slice(1)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Lunch:</span>
                                <span className="text-gray-600">{currentMeal.lunch.charAt(0).toUpperCase() + currentMeal.lunch.slice(1)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Dinner:</span>
                                <span className="text-gray-600">{currentMeal.dinner.charAt(0).toUpperCase() + currentMeal.dinner.slice(1)}</span>
                            </div>
                        </div>
                    </div>
                    {/* Menu Selection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Breakfast Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="breakfast" className="text-lg font-semibold text-gray-700 mb-3">
                                    Breakfast
                                    <span className="text-sm font-normal text-gray-500 block">
                                        7:30 AM - 9:30 AM
                                    </span>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setMealData({ ...mealData, breakfast: e.target.value })
                                        if (e.target.value !== 'others') {
                                            setCustomMeals({ ...customMeals, breakfast: '' })
                                        }
                                    }}
                                    id="breakfast"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Select breakfast item</option>
                                    <option value="idly">Idly with Sambar & Chutney</option>
                                    <option value="dosa">Masala Dosa with Chutney</option>
                                    <option value="poori">Poori with Potato Curry</option>
                                    <option value="upma">Vegetable Upma with Chutney</option>
                                    <option value="pongal">Pongal with Coconut Chutney</option>
                                    <option value="others">Others</option>
                                </select>

                                {mealData.breakfast === 'others' && (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-700 my-3">New Breakfast Item</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter custom breakfast item"
                                            value={customMeals.breakfast}
                                            onChange={(e) => setCustomMeals({ ...customMeals, breakfast: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Lunch Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-400">
                            <div className="flex flex-col">
                                <label htmlFor="lunch" className="text-lg font-semibold text-gray-700 mb-3">
                                    Lunch
                                    <span className="text-sm font-normal text-gray-500 block">
                                        12:30 PM - 2:30 PM
                                    </span>
                                </label>
                                <select
                                    onChange={(e) => setMealData({ ...mealData, lunch: e.target.value })}
                                    id="lunch"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select lunch item</option>
                                    <option value="meals">South Indian Meals</option>
                                    <option value="biryani">Vegetable Biryani</option>
                                    <option value="pulao">Jeera Pulao with Dal</option>
                                    <option value="curdRice">Curd Rice with Pickle</option>
                                    <option value="chapati">Chapati with Paneer Curry</option>
                                    <option value="others">Others</option>
                                </select>

                                {mealData.lunch === 'others' && (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-700 my-3">New Lunch Item</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter custom lunch item"
                                            value={customMeals.lunch}
                                            onChange={(e) => setCustomMeals({ ...customMeals, lunch: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Dinner Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-400">
                            <div className="flex flex-col">
                                <label htmlFor="dinner" className="text-lg font-semibold text-gray-700 mb-3">
                                    Dinner
                                    <span className="text-sm font-normal text-gray-500 block">
                                        7:30 PM - 9:30 PM
                                    </span>
                                </label>
                                <select
                                    onChange={(e) => setMealData({ ...mealData, dinner: e.target.value })}
                                    id="dinner"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                                >
                                    <option value="">Select dinner item</option>
                                    <option value="chapati">Chapati with Mixed Veg</option>
                                    <option value="parotta">Parotta with Kurma</option>
                                    <option value="friedRice">Vegetable Fried Rice</option>
                                    <option value="noodles">Hakka Noodles</option>
                                    <option value="khichdi">Khichdi with Papad</option>
                                    <option value="others">Others</option>
                                </select>

                                {mealData.dinner === 'others' && (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-700 my-3">New Dinner Item</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter custom dinner item"
                                            value={customMeals.dinner}
                                            onChange={(e) => setCustomMeals({ ...customMeals, dinner: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Additional Information Section with updated styling */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Today's Special Notes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Meal Timings</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Breakfast: 7:30 AM - 9:30 AM
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Lunch: 12:30 PM - 2:30 PM
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Dinner: 7:30 PM - 9:30 PM
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Rules</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        No outside food allowed in the dining area
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Please clean up after eating
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Respect quiet hours after 10:00 PM
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center">
                        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-indigo-700 transform transition-transform duration-200 hover:scale-105">
                            Confirm Menu Selection
                        </button>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>Menu selections must be made before 8:00 PM for the next day.</p>
                        <p>For any dietary restrictions or special requests, please contact the mess manager.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

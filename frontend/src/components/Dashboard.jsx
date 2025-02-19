import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Logo from '../assets/logo.jpg'
import Select from 'react-select';


const Dashboard = () => {

    const [mealData, setMealData] = useState({
        breakfast: [],
        lunch: [],
        dinner: []
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

    // Add this state for day selection
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [weeklyMenu, setWeeklyMenu] = useState({
        Monday: { breakfast: '', lunch: '', dinner: '' },
        Tuesday: { breakfast: '', lunch: '', dinner: '' },
        Wednesday: { breakfast: '', lunch: '', dinner: '' },
        Thursday: { breakfast: '', lunch: '', dinner: '' },
        Friday: { breakfast: '', lunch: '', dinner: '' },
        Saturday: { breakfast: '', lunch: '', dinner: '' },
        Sunday: { breakfast: '', lunch: '', dinner: '' }
    });

    // Add this state to track the selected day's menu
    const [selectedDayMenu, setSelectedDayMenu] = useState({
        breakfast: [],
        lunch: [],
        dinner: []
    });

    // Convert your meal options to the format react-select expects
    const mealOptions = {
        breakfast: [
            { value: 'idly', label: 'Idly' },
            { value: 'sambar', label: 'Sambar' },
            { value: 'pongal', label: 'Pongal' },
            { value: 'bajji', label: 'Bajji' },
            { value: 'coconut-chutney', label: 'Coconut chutney' },
            { value: 'medhu-vadai', label: 'Medhu Vadai' },
            { value: 'rava-upma', label: 'Rava upma' },
            { value: 'wheat-upma', label: 'Wheat upma' },
            { value: 'masal-vadai', label: 'Masal Vadai' },
            { value: 'poori', label: 'Poori' },
            { value: 'potato-guruma', label: 'Potato guruma' },
            
        ],
        lunch: [
            { value: 'sadam', label: 'Rice' },
            { value: 'kadamba_sambar', label: 'Mixed Sambar' },
            { value: 'urulaikizhangu', label: 'Potato' },
            { value: 'thakkali_rasam', label: 'Tomato Rasam' },
            { value: 'buttermilk', label: 'Buttermilk' },
            { value: 'appalam', label: 'Papad' },
           
        
          
            { value: 'urundai_kuzhambu', label: 'Urundai Gravy' },
            { value: 'pudalangai_kootu', label: 'Snake Gourd Kootu' },
            { value: 'thakkali_rasam', label: 'Tomato Rasam' },
        
           
        
           
            { value: 'beetroot_porial', label: 'Beetroot Stir-fry' },
            { value: 'vengaya_rasam', label: 'Onion Rasam' },
            
           
        
           
            { value: 'poricha_kuzhambu', label: 'Poricha kulambu' },
            { value: 'vazhaikai_porial', label: 'Vazhaakai fry' },
            
           
        
           
            { value: 'keera_porial', label: 'Greens Stir-fry' },
           
            
            { value: 'vendhaya_kuzhambu', label: 'Vendhaya Kulambu' },
            { value: 'thakkali_kootu', label: 'Tomato Kootu' },
            { value: 'oorugai', label: 'Pickle' }
           
        ]
        ,
        dinner: [
            { value: 'veg_kurma', label: 'Vegetable Kurma' },
            { value: 'pulav_rice', label: 'Pulav Rice' },
            { value: 'dhal', label: 'Dhal Soup' },
           
            { value: 'sambar', label: 'Sambar' },
           
            { value: 'semia_kichadi', label: 'Semia Kichadi' },
            { value: 'dosa', label: 'Dosa' },
            { value: 'karaa_chutney', label: 'Kaara Chutney' },
            { value: 'chapati', label: 'Chapati' },
            { value: 'pattani_kurma', label: 'Pattani Kurma' },
            
            { value: 'adai', label: 'Adai' },
            { value: 'coconut_chutney', label: 'Coconut Chutney' },
            { value: 'curd_rice', label: 'Curd Rice' },
            { value: 'oorugai', label: 'Pickle' }
        ]
        
    };

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
            // const response = await axios.get('https://avc-hostel.onrender.com/api/get-meal')
            const response = await axios.get('https://avc-hostel.onrender.com/api/get-meal')
            console.log(response)
            setCurrentMeal(response.data.data[0])
        }
        catch (err) {
            toast.error("Error in fetching menu")
        }
    }, [])


    
    useEffect(() => {
        const fetchWeeklyMenu = async () => {
            try {
                const response = await axios.get('https://avc-hostel.onrender.com/api/weekly-menu');
                if (response.data.success) {
                    setWeeklyMenu(response.data.data);
                }
            } catch (error) {
                toast.error('Error fetching weekly menu');
            }
        };

        fetchWeeklyMenu();
    }, []);

    // Add this useEffect to update the current menu when day changes
    useEffect(() => {
        const fetchMenuForDay = async () => {
            try {
                const response = await axios.get('https://avc-hostel.onrender.com/api/weekly-menu');
                if (response.data.success) {
                    const weeklyMenu = response.data.data;
                    const todaysMenu = weeklyMenu.find(menu => menu.day === selectedDay);
                    if (todaysMenu) {
                        // Update the selected day menu display
                        setSelectedDayMenu({
                            breakfast: todaysMenu.breakfast,
                            lunch: todaysMenu.lunch,
                            dinner: todaysMenu.dinner
                        });

                        // Convert menu items to react-select format
                        setMealData({
                            breakfast: todaysMenu.breakfast.map(item => ({
                                value: item.toLowerCase(),
                                label: item
                            })),
                            lunch: todaysMenu.lunch.map(item => ({
                                value: item.toLowerCase(),
                                label: item
                            })),
                            dinner: todaysMenu.dinner.map(item => ({
                                value: item.toLowerCase(),
                                label: item
                            }))
                        });
                    } else {
                        // Reset selections if no menu exists for the day
                        setSelectedDayMenu({
                            breakfast: [],
                            lunch: [],
                            dinner: []
                        });
                        setMealData({
                            breakfast: [],
                            lunch: [],
                            dinner: []
                        });
                    }
                }
            } catch (error) {
                toast.error('Error fetching menu for selected day');
            }
        };

        fetchMenuForDay();
    }, [selectedDay]);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Transform the selected options to just the labels
        const transformedMeals = {
            breakfast: mealData.breakfast.map(item => item.label),
            lunch: mealData.lunch.map(item => item.label),
            dinner: mealData.dinner.map(item => item.label)
        };

        try {
            const response = await axios.patch(`https://avc-hostel.onrender.com/api/weekly-menu/${selectedDay}`, {
                meals: transformedMeals  
            });

            if (response.data.success) {
                toast.success(`Menu for ${selectedDay} updated successfully`);
                // Update local state
                setWeeklyMenu(prev => ({
                    ...prev,
                    [selectedDay]: transformedMeals
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update menu');
        }
    };


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
                    <div className="bg-white p-6 border-2 border-indigo-500 w-80 mx-auto rounded-lg shadow-lg mb-8">
                        <h2 className="text-xl text-center font-bold text-indigo-800 mb-6">
                            {selectedDay}'s Menu
                        </h2>
                        <div className="flex flex-col space-y-4">
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-800 block mb-2">Breakfast:</span>
                                <div className="pl-4 text-gray-700">
                                    {Array.isArray(selectedDayMenu.breakfast) && selectedDayMenu.breakfast.length > 0 
                                        ? selectedDayMenu.breakfast.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-indigo-500 mr-2">•</span>
                                                {item}
                                            </div>
                                        ))
                                        : <span className="text-gray-500 italic">Not set</span>
                                    }
                                </div>
                            </div>
                            <div className="border-b pb-3">
                                <span className="font-semibold text-gray-800 block mb-2">Lunch:</span>
                                <div className="pl-4 text-gray-700">
                                    {Array.isArray(selectedDayMenu.lunch) && selectedDayMenu.lunch.length > 0 
                                        ? selectedDayMenu.lunch.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-indigo-500 mr-2">•</span>
                                                {item}
                                            </div>
                                        ))
                                        : <span className="text-gray-500 italic">Not set</span>
                                    }
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800 block mb-2">Dinner:</span>
                                <div className="pl-4 text-gray-700">
                                    {Array.isArray(selectedDayMenu.dinner) && selectedDayMenu.dinner.length > 0 
                                        ? selectedDayMenu.dinner.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-indigo-500 mr-2">•</span>
                                                {item}
                                            </div>
                                        ))
                                        : <span className="text-gray-500 italic">Not set</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Add this before the meal selection grid */}
                    <div className="mb-8">
                        <label htmlFor="day-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Day
                        </label>
                        <select
                            id="day-select"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
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
                                <Select
                                    isMulti
                                    name="breakfast"
                                    options={mealOptions.breakfast}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={mealData.breakfast}
                                    onChange={(selectedOptions) => {
                                        setMealData({
                                            ...mealData,
                                            breakfast: selectedOptions || []
                                        });
                                    }}
                                />

                                {mealData.breakfast.includes('others') && (
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
                                <Select
                                    isMulti
                                    name="lunch"
                                    options={mealOptions.lunch}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={mealData.lunch}
                                    onChange={(selectedOptions) => {
                                        setMealData({
                                            ...mealData,
                                            lunch: selectedOptions || []
                                        });
                                    }}
                                />

                                {mealData.lunch.includes('others') && (
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
                                <Select
                                    isMulti
                                    name="dinner"
                                    options={mealOptions.dinner}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={mealData.dinner}
                                    onChange={(selectedOptions) => {
                                        setMealData({
                                            ...mealData,
                                            dinner: selectedOptions || []
                                        });
                                    }}
                                />

                                {mealData.dinner.includes('others') && (
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

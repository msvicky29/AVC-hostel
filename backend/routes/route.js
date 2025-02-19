const express = require('express')
const adminRoute = express.Router()
const { signUp, logIn, forgotPassword, resetPassword, submitMenu, updateMenu,getMealData,getMealByDay, getWeeklyMenu, updateWeeklyMenu } = require('../auth/auth.js')

adminRoute.post('/sign-up',signUp)
adminRoute.post('/login',logIn)
adminRoute.post('/forgot-password',forgotPassword)
adminRoute.post('/reset-password/:token',resetPassword)
adminRoute.post('/submit-menu',submitMenu)
adminRoute.patch('/update-menu', updateMenu)
adminRoute.get('/get-meal', getMealData)
// adminRoute.put('/get-meal-by-day/:day',getMealByDay)
adminRoute.get('/get-meal-by-day/:day',getMealByDay)
adminRoute.get('/weekly-menu', getWeeklyMenu)
adminRoute.patch('/weekly-menu/:day', updateWeeklyMenu)


module.exports = adminRoute

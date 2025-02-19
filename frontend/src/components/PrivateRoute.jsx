import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                setIsAuthenticated(false)
                return
            }

            try {
                // const response = await axios.get('https://avc-hostel.onrender.com/api/protected-route', {
                const response = await axios.get('https://avc-hostel.onrender.com/api/protected-route', {
                    headers: { 'Authorization': `${token}` }
                })
                if (response.data.success) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    localStorage.removeItem('token')
                }
            } catch (error) {
                console.error('Token validation failed:', error)
                setIsAuthenticated(false)
                localStorage.removeItem('token')
            }
        }

        verifyToken()
    }, [])

    if (isAuthenticated === null) {
        return <Loading/>
    }

    return isAuthenticated ? children : <Navigate to='/' />
}

export default PrivateRoute

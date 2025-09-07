import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const token = localStorage.getItem('token')
        setIsLoggedIn(token !== null)
    }, [])

    return {
        isLoggedIn,
        login: (token) => {
            localStorage.setItem('token', token)
            setIsLoggedIn(true)
        },
        logout: () => {
            localStorage.removeItem('token')
            setIsLoggedIn(false)
            navigate('/login')
        }
    }
}
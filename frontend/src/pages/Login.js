import { useState, useEffect } from "react"
import { Auth } from '../Auth'
import { useNavigate, Link } from "react-router-dom"
import './Registration.css'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { login } = Auth()
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        if (isInitialized) return

        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            login(storedToken)
            navigate('/positions')
            setIsInitialized(true)
        }
    }, [navigate, login, isInitialized])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Error')
            }

            const data = await response.json()
            login(data.access)
            localStorage.setItem('token', data.access)
            navigate('/positions')
        } catch (error) {
            setError(error.message)
        }
        
    }

    return (
        <div className="register-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                </div>

                <button type="submit" className="submit-button">Login</button>
                <Link className="link_register" to={`/register/`}>Create new account</Link>
            </form>
        </div>
    )
}

export default Login
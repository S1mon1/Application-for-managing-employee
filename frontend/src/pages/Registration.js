import { useState } from "react"
import { Auth } from "../Auth"
import { useNavigate, Link } from "react-router-dom"
import './Registration.css'

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await fetch(`http://127.0.0.1:8000/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            
        } catch (error) {
            console.error(error)
        }
        navigate('/login')
    }

    return (
        <div className="register-container">
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

                <button type="submit" className="submit-button">Create new account</button>
                <Link className="link_register" to={`/login/`}>Login</Link>
            </form>
        </div>
    )
}

export default Registration
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const UpdatePosition = () => {
    const { id: positionId } = useParams()
    const [position, setPosition] = useState({
        position_name: '',
        description: ''
    })
    const navigate = useNavigate()

    const getPosition = useCallback (async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/positions/${positionId}/`)
        const data = await response.json()
        setPosition(data)
    }, [positionId])

    useEffect(() => {
        getPosition()
    }, [positionId, getPosition])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPosition(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch (`http://127.0.0.1:8000/api/positions/${positionId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(position)
        })
        navigate(`/positions/${positionId}`)
    }

    return (
        <div className='main-container'>
            <Navbar headerText={"Edit Position"}/>
            <Sidebar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Stanowisko:</label>
                    <input
                        type="text"
                        name="position_name"
                        value={position.position_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Opis stanowiska:</label>
                    <input
                        type="text"
                        name="description"
                        value={position.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Zapisz zmiany</button>
            </form>

        </div>
    )
}

export default UpdatePosition
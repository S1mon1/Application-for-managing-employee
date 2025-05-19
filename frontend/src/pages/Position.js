import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Position = ({}) => {

    const {id: positionId} = useParams()
    const [position, setPosition] = useState(null)

    useEffect(() => {
        getPosition()
    }, [positionId])

    const getPosition = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/positions/${positionId}/`)
        const data = await response.json()
        setPosition(data)
    }

    return (
        <div>
            <Navbar headerText={"Position"}/>
            <Sidebar/>
            <div className="main-container">
                <p>{position?.position_name}</p>
                <p>{position?.description}</p>
            </div>
        </div>
    )
}

export default Position
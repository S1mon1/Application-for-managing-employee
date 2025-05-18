import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import ListPositions from '../components/ListPositions'
import './Positions.css'
import Sidebar from '../components/Sidebar'

const Positions = ({}) => {

    const [positions, setPositions] = useState([])

    useEffect(() =>{
        getPositions()
    }, [])

    const getPositions = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/positions/')
        const data = await response.json()
        setPositions(data)
    }

    return (
        <div>
            <Navbar headerText={"Position List"}/>
            <Sidebar/>
            <div className="main-container">
                
                {positions.map((position, index) => (
                    <ListPositions key={index} position={position}/>
                ))}
            </div>
        </div>
    )
}

export default Positions
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PositionUpdateButton from '../components/PositionUpdateButton'
import DeleteButton from '../components/DeleteButton'

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
            <div className='main-container'>
                <div className='content-wrapper'>
                    <div className='details-list'>
                        <div className='detail-row'>
                            <span>Position</span>
                            <span>{position?.position_name}</span>
                        </div>
                        <div className='detail-row alternate-bg'>
                            <span>Description</span>
                            <span>{position?.description}</span>
                        </div>
                        <div className='detail-row'>
                            <span>Permissions (required)</span>
                            <span>{position?.required_permissions?.map(per => per.permission_name).join(', ')}</span>
                        </div>
                    </div>
                    <div className='button-container'>
                        <PositionUpdateButton/>
                        <DeleteButton
                        deletePath={`http://127.0.0.1:8000/api/positions/${positionId}/delete/`}
                        pathUrl="/positions"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Position
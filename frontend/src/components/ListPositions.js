import React from 'react'
import { Link } from 'react-router-dom'
import './ListPositions.css'

const ListPositions = ({position}) => {
    return(
        <Link to={`/positions/${position.id}`} className="positionLink">
            <span className="positionName">
                {position.position_name}
            </span>
        </Link>
    )
}

export default ListPositions
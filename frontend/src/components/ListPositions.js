import React from 'react'
import { Link } from 'react-router-dom'

const ListPositions = ({position}) => {
    return(
        <Link to={`/positions/${position.id}`}>
            <h3>{position.position_name}</h3>
        </Link>
    )
}

export default ListPositions
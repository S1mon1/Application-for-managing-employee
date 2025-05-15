import React from 'react'
import { Link } from 'react-router-dom'

const ListPositions = ({position}) => {
    return(
        <div>
            <h3>{position.position_name}</h3>
        </div>
    )
}

export default ListPositions
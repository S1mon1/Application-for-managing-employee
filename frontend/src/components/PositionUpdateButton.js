import { Link, useParams } from 'react-router-dom'

const PositionUpdateButton = () => {
    const { id: positionId } = useParams()

    return (
        <Link className='button-style' to={`/positions/${positionId}/updatePosition`}>
            Edit
        </Link>
    )
}

export default PositionUpdateButton
import { Link, useParams } from 'react-router-dom'

const PositionUpdateButton = () => {
    const { id: positionId } = useParams()

    return (
        <Link to={`/positions/${positionId}/updatePosition`}>
            Edytuj
        </Link>
    )
}

export default PositionUpdateButton
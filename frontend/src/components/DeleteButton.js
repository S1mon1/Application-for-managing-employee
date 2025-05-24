import { useNavigate } from "react-router-dom"

const DeleteButton = ({ deletePath, pathUrl }) => {

    const navigate = useNavigate()

     const handleDelete = async () => {
        if (!window.confirm('Are you sure?'))
            return

        try {
            const response = await fetch(deletePath, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok){
                throw new Error("Nie usunięto")
            }
        
        navigate(pathUrl)
    } catch (error) {
        alert ("Error")
        console.error(error)
    
        }
    }   

    return (
        <button type="button" onClick={handleDelete} className="delete-button">
            Delete
        </button>
    )
}

export default DeleteButton


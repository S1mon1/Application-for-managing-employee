import { Navigate } from "react-router-dom"
import { useEffect, useState, useContext, createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

const LoginRoute = ({ routes }) => {
  const context = useContext(AuthContext)

  const { isLoggedIn } = context

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return routes
}

export { AuthProvider, AuthContext}
export default LoginRoute
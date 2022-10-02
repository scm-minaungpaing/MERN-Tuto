import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import { getUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_API_KEY}/user`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })

      if (res.status === 200) {
          const userData = await res.json()
          dispatch(getUser(userData))
      }
      setLoading(false)
  }
  
  useEffect(() => {
      if (!token) return 
      fetchUser()
  }, [])

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <> 
      <AppBar/>
      <Outlet/>
    </>
  )
}

export default App

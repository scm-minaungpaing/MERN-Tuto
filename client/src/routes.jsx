import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Cookies from "js-cookie";
import Guest from "./utils/Guest";
import CheckAuth from "./utils/CheckAuth";


const token = Cookies.get('token')

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: 
        <CheckAuth>
          <Home/>
        </CheckAuth>
      },
      {
        path: "/login",
        element: 
        <Guest>
          <Login/> 
        </Guest>
      },
      {
        path: "/register",
        element: 
        <Guest>
          <Register/>
        </Guest>
      }
    ]
  },  
]);

export default router;
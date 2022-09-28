import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      }
    ]
  },  
]);

export default router;
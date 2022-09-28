import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import {
  createBrowserRouter as Router,
  RouterProvider,
  Route,
} from "react-router-dom";
import './main.css'
import router from './routes'
// import Login from './pages/auth/Login';
// import Home from './pages/Home';
// import Register from './pages/auth/Register';

// const router = Router([
//   {
//     element: <App/>,
//     children: [
//       {
//         path: "/",
//         element: <Home/>
//       },
//       {
//         path: "/login",
//         element: <Login/>
//       },
//       {
//         path: "/register",
//         element: <Register/>
//       }
//     ]
//   },  
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

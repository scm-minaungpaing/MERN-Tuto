import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/authSlice';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const token = Cookies.get('token')

  const logout = () => {
    Cookies.remove('token')
    dispatch(clearUser())
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='text-white'>
              HOME
            </Link>
          </Typography>
          {!isAuthenticated && (
            <>
              <Button onClick={logout} color="inherit">Logout</Button>
              <Link to="/register" className='text-white'>
                <Button color="inherit">Register</Button>
              </Link>
            </>)}
          {isAuthenticated && 
          <>
             <Link to="/category" className='text-white'>
             <Button color="inherit">Category</Button>
            </Link>
            <Button onClick={logout} color="inherit">Logout</Button>
          </> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

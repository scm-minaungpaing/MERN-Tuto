import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
// import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getUser } from '../store/authSlice';

const Category = () => {
    const dispatch = useDispatch();
    const user = useSelector((state => state.auth.user))
    const token = Cookies.get('token');
    
    const removeCategory = async (id) => {
        if(!window.confirm('Are you sure to delete?')) return
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/category/${id}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${token}`
              }
        })
        if (res.status === 200) {
           const _user = {
            ...user, categories: user.categories.filter(cat => cat._id != id)
           }
           dispatch(getUser({ user: _user}))
        }
    }

    return (
        <Container sx={{ marginBottom: 10 }}>
            <Typography variant="h6" sx={{marginTop: 10}}>List of Category</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {user.categories.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">{row.label}</TableCell>
                        <TableCell align="center">{row.icon}</TableCell>
                        <TableCell align="center">
                            {/* <IconButton 
                                style={{color: '#2196f3', border:'1px solid #2196f3'}}
                                onClick={() => setEditCategory(row)}>
                                <EditSharpIcon/>
                            </IconButton>*/}
                            <IconButton
                                sx={{marginLeft:2}} 
                                color="error" 
                                style={{border:'1px solid #d32f2f'}}
                                onClick={() => removeCategory(row._id)}
                            >
                                <DeleteSharpIcon/>
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Category
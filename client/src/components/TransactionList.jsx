import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function TransactionList({transactions, fetchTransactions, setEditTransaction}) {
    const user = useSelector((state => state.auth.user))
    const categoryName = (id) => {
        const category = user.categories.find((category) => category._id === id)
        return category ? category.label : 'N/A' 
    }

    const token = Cookies.get('token')
    const removeTrans = async (id) => {
        if(!window.confirm('Are you sure to delete?')) return
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/transaction/${id}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${token}`
              }
        })
        if (res.status === 200) {
            window.alert("Deleted Successfully!")
            fetchTransactions()
        }
    }
    const formatDate = (date) => {
        return dayjs(date).format('DD/MM/YYYY')
    }

    return (
        <>
            <Typography variant="h6" sx={{marginTop: 10}}>List of transactions</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {transactions.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                            {row.amount}
                        </TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="center">{categoryName(row.category_id)}</TableCell>
                        <TableCell align="center">{formatDate(row.date)}</TableCell>
                        <TableCell align="center">
                            <IconButton 
                                style={{color: '#2196f3', border:'1px solid #2196f3'}}
                                onClick={() => setEditTransaction(row)}>
                                <EditSharpIcon/>
                            </IconButton>                     
                            <IconButton 
                                sx={{marginLeft:2}} 
                                color="error" 
                                style={{border:'1px solid #d32f2f'}}
                                onClick={() => removeTrans(row._id)}
                            >
                                <DeleteSharpIcon/>
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

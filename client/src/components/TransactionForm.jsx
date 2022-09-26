import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';


export default function BasicCard({fetchTransactions}) {  
  const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
  }
  
  const [form, setForm] = useState(initialForm)

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:5000/transaction', {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "content-type": "application/json", }
    })
    if (res.status === 200) {
      setForm(initialForm)
      fetchTransactions()
    }
  }

  const handelChange = (value) => {
    setForm({ ...form, date: value })
  }



  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
          <Typography variant="h6">Add new transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            sx={{marginRight: 5}} 
            size="small" 
            label="Amount" 
            variant="outlined" 
            onChange={handleInput}
            value={form.amount}
            name="amount"
          />
          <TextField 
            sx={{marginRight: 5}} 
            size="small" 
            label="Description" 
            variant="outlined"
            onChange={handleInput}
            value={form.description}
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              minDate={dayjs('2017-01-01')}
              value={form.date}
              name="date"
              onChange={handelChange}
              renderInput={(params) => <TextField sx={{marginRight: 5}} size="small" {...params} />}
            />
          </LocalizationProvider>
          <Button type='submit' variant="contained">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
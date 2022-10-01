import React from 'react'
import { useEffect, useState } from "react"
import { Container } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Cookies from 'js-cookie';

const Home = () => {
  const [transaction, setTransaction] = useState([])
  const [editTransaction, setEditTransaction] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const token = Cookies.get('token')
    const res = await fetch(`${import.meta.env.VITE_API_KEY}/transaction`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const {data} = await res.json()
    setTransaction(data)
  }

  return (
    <Container sx={{ marginBottom: 10 }}>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
      <TransactionList
        transactions={transaction}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  )
}

export default Home
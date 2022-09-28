import React from 'react'
import { useEffect, useState } from "react"
import { Container } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = () => {
  const [transaction, setTransaction] = useState([])
  const [editTransaction, setEditTransaction] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:5000/transaction')
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
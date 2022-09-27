import { Container } from "@mui/material";
import { useEffect, useState } from "react"
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {  
  const [transaction, setTransaction] = useState([])


  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:5000/transaction')
    const {data} = await res.json()
    setTransaction(data)
  }

  return (
    <div className="App"> 
      <AppBar/>
      <Container sx={{marginBottom: 10}}>
        <TransactionForm 
          fetchTransactions={fetchTransactions}
        />
        <TransactionList 
          transactions={transaction} 
          fetchTransactions={fetchTransactions}
        />
      </Container>
    </div>
  )
}

export default App

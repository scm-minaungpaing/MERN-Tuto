import { useEffect, useState } from "react"
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";

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
      <TransactionForm fetchTransactions={fetchTransactions} /> 

      <br />

      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { transaction.map(trx => 
            <tr key={trx._id}>
              <th>{ trx.amount }</th>
              <th>{ trx.description }</th>
              <th>{ trx.date }</th>
            </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    //Fetching from the db.json happens here
    
    useEffect(() => {
      fetch('https://my-json-server.typicode.com/edwinaloo/phase-2-challenge/"transactions"')
      .then (response => response.json())
      .then(transactions => setTransactions(transactions));
      
      }, []);

  const handleAddTransaction = (newTransaction) => {
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TransactionTable transactions={filteredTransactions} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
};

export default App;


import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

const initialState = {
  net_income: '',
  total_assets: '',
  total_liabilities: '',
  current_assets: '',
  current_liabilities: ''
};

function App() {
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/calculate', inputs)
      .then(response => {
	const score = response.data.zmijewski_score.toFixed(2);
	const riskMessage = response.data.risk;
	alert(`Zmijewski Score: ${score} - ${riskMessage}`);
	setInputs(initialState);
      })
      .catch(error => {
	alert('Error: ' + (error.response ? error.response.data.error : error.message));
	setInputs(initialState);
      });
  };
  return (
    <div className="App">
      <h1>Calculate a Bankruptcy</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="net_income" placeholder="Net Income" onChange={handleChange} /><br />
        <input type="text" name="total_assets" placeholder="Total Assets" onChange={handleChange} /><br />
        <input type="text" name="total_liabilities" placeholder="Total Liabilities" onChange={handleChange} /><br />
        <input type="text" name="current_assets" placeholder="Current Assets" onChange={handleChange} /><br />
        <input type="text" name="current_liabilities" placeholder="Current Liabilities" onChange={handleChange} /><br />
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}

export default App;

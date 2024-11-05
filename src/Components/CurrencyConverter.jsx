import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const conversionRate = data.rates[toCurrency];
      const convertedAmount = amount * conversionRate;
      setResult(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 to-purple-400">
      <div className="w-full max-w-sm p-8 bg-slate-200 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700 animate-fadeIn">
          Currency Converter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 transition-shadow outline-none text-xl placeholder-gray-400"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 transition-shadow outline-none text-lg"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <button
              type="button"
              className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transform hover:rotate-180 transition-transform duration-300 ease-in-out focus:outline-none"
              onClick={handleSwapCurrencies}
            >
              ⇆
            </button>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-400 transition-shadow outline-none text-lg"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transform hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              Convert
            </button>
          </div>
        </form>
        {result && (
          <div className="mt-6 text-center text-green-600 text-lg font-semibold animate-fadeIn">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

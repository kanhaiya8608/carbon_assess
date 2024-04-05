import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Crypto() {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setPrices(response.data.bpi);
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    }
    fetchPrices();
  }, []);

  return (
    <div className=" justify-center gap-8">
      <h2 className="text-3xl font-bold mb-8">Cryptocurrency Prices</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {prices && Object.keys(prices).map(currency => (
        <div key={currency} className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold">{currency}</h3>
   
          <p className="text-lg">
          <span className="text-lg pr-2" dangerouslySetInnerHTML={{ __html: prices[currency].symbol }}></span>
            {prices[currency].rate}</p>
          <p className="text-sm">{prices[currency].description}</p>
        </div>
      ))}
    </div></div>
  );
}

export default Crypto;

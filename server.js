// Import required modules
const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define a route to proxy the CoinMarketCap API
app.get('/crypto-data', async (req, res) => {
  try {
    const apiKey = process.env.COIN_MARKET_CAP_API_KEY;
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const response = await fetch(`${apiUrl}?CMC_PRO_API_KEY=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a port for your server to listen on
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

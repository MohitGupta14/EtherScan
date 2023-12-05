const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
const YOUR_ETHERSCAN_API_KEY = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';
// Route to get information about a specific block

app.get('/ethereum-price', async (req, res) => {
  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'stats',
        action: 'ethprice',
        apikey: YOUR_ETHERSCAN_API_KEY,
      },
    });

    const ethereumPrice = response.data.result.ethusd;
    res.json({ price: ethereumPrice });
  } catch (error) {
    console.error('Error fetching Ethereum price:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/ethGasPrice', async (req, res) => {
  try {
    const apiKey = YOUR_ETHERSCAN_API_KEY; // Replace with your EtherScan API key
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const gasPrice = response.data.result.ProposeGasPrice;

    res.json({ gasPrice });
  } catch (error) {
    console.error('Error fetching gas price:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/address', async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    const apiUrl = 'https://api.etherscan.io/api';
    const apiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

    const params = {
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 25,
      sort: 'desc',
      apikey: apiKey,
    };

    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

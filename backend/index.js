const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
const YOUR_ETHERSCAN_API_KEY = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';
// Route to get information about a specific block
app.get('/balance/:address', async (req, res) => {
    try {
      const address = req.params.address;
      const apiKey = YOUR_ETHERSCAN_API_KEY; // Replace with your Etherscan API key
  
      const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${apiKey}`;
      const response = await axios.get(apiUrl);
  
      // Check if the API request was successful
      if (response.data.status === '1') {
        const balance = response.data.result;
        res.json({ balance });
      } else {
        res.status(500).json({ error: 'Error fetching balance' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/block/:blockNumber', async (req, res) => {
  try {
    const blockNumber = req.params.blockNumber;
    const apiKey = YOUR_ETHERSCAN_API_KEY;

    const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === '1') {
      const blockInfo = response.data.result;
      res.json({ blockInfo });
    } else {
      res.status(500).json({ error: 'Error fetching block information' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get information about a specific transaction
app.get('/transaction/:transactionHash', async (req, res) => {
  try {
    const transactionHash = req.params.transactionHash;
    const apiKey = YOUR_ETHERSCAN_API_KEY;

    const apiUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === '1') {
      const transactionInfo = response.data.result;
      res.json({ transactionInfo });
    } else {
      res.status(500).json({ error: 'Error fetching transaction information' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get information about a specific address
app.get('/address/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const apiKey = YOUR_ETHERSCAN_API_KEY;

    const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === '1') {
      const balance = response.data.result;
      res.json({ balance });
    } else {
      res.status(500).json({ error: 'Error fetching address information' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get information about a specific token
app.get('/token/:contractAddress', async (req, res) => {
  try {
    const contractAddress = req.params.contractAddress;
    const apiKey = YOUR_ETHERSCAN_API_KEY;

    const apiUrl = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === '1') {
      const tokenInfo = response.data.result;
      res.json({ tokenInfo });
    } else {
      res.status(500).json({ error: 'Error fetching token information' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to verify a smart contract
app.post('/verify-contract', async (req, res) => {
  try {
    // Implementation for contract verification goes here
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get blockchain statistics
app.get('/stats', async (req, res) => {
  try {
    // Implementation for blockchain statistics goes here
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Additional routes and features can be added based on your requirements

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
      offset: 20,
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

app.get("/totalTransactionsCount", async (req, res) => {
  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "stats",
        action: "ethsupply",
        apikey: YOUR_ETHERSCAN_API_KEY,
      },
    });

    const totalTransactionsCount = response.data.result;

    
    return res.status(200).json({ totalTransactionsCount });
  } catch (error) {
    console.error(`Error fetching total transactions count: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/balance", async(req,res) =>{
  try{

    const { address } = req.query;
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "balance",
        address: address,
        tag : "latest",
        apikey: YOUR_ETHERSCAN_API_KEY,
      },
    });
    const getBalance =  response.data.result;
    return res.status(200).json({ getBalance });
  } catch (error) {
    console.error(`Error fetching latest balance : ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get('/erc20', async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    const apiUrl = 'https://api.etherscan.io/api';
    const apiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

    const params = {
      module: 'account',
      action: 'tokentx',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 20,
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


app.get('/latestBlocks', async (req, res) => {
  try {
    // Get the latest block number
    const apiUrl = 'https://api.etherscan.io/api';
    const apiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

    const latestBlockResponse = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_blockNumber',
        apiKey: apiKey,
      },
    });

    const latestBlockNumber = parseInt(latestBlockResponse.data.result, 16);

    // Fetch block details for the last 6 blocks
    const blockDetails = [];
    for (let i = latestBlockNumber; i > latestBlockNumber - 6; i--) {
      const blockResponse = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_getBlockByNumber',
          tag: `0x${i.toString(16)}`,
          apiKey: apiKey,
          boolean:true
        },
      });

      const blockData = blockResponse.data.result;
      const timestamp = parseInt(blockData.timestamp, 16) * 1000; // Convert to milliseconds
      const timeAgo = Math.floor((Date.now() - timestamp) / 1000); // Time in seconds

      blockDetails.push({
        blockHeight: i,
        timestamp: timestamp,
        timeAgo: timeAgo,
        txnHash: blockData.transactions[0], // You can choose which transaction hash to include
      });
    }

    res.json({ latestBlocks: blockDetails });
  } catch (error) {
    console.error('Error fetching latest block details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/latestTransactions', async (req, res) => {
  try {
    // Fetch recent transactions using the eth_getLogs endpoint
    const apiUrl = 'https://api.etherscan.io/api';
    const apiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';
    const logsResponse = await axios.get(apiUrl, {
      params: {
        module: 'logs',
        action: 'getLogs',
        fromBlock: 'latest',
        toBlock: 'latest',
        sort: 'desc',
        apiKey: apiKey,
      },
    });

    const transactions = [];
    const logEntries = logsResponse.data.result || [];
    // Process each log entry
    logEntries.forEach((log) => {
      const timestamp = parseInt(log.timeStamp);
      const timeAgo = Math.floor((Date.now() / 1000 - timestamp) / 60); // Time in minutes

      transactions.push({
        timestamp: timestamp,
        timeAgo: timeAgo,
        txnHash: log.transactionHash,
      });
    });

    res.json({ latestTransactions: transactions });
  } catch (error) {
    console.error('Error fetching latest transactions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

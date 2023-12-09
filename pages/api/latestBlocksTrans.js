// pages/api/latestBlocksTrans.js
import axios from 'axios';

export default async function handler(req, res) {
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
 
    const block1Response = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        tag: `${latestBlockNumber.toString(16)}`,
        apiKey: apiKey,
        boolean: true,
      },
    });

    const blockData1 = [];
    blockData1.push(block1Response.data.result.transactions);
    const timestamp = parseInt(block1Response.data.result.timestamp, 16) * 1000; // Convert to milliseconds
    const timeAgo = Math.floor((Date.now() - timestamp) / 1000); // Time in seconds
    const transactions = [];
    
    for (let i = 0; i < 6; i++) {
      const transactionObject = {
        hash: blockData1[0][i].hash,
        from: blockData1[0][i].from,
        to: blockData1[0][i].to,
        value : blockData1[0][i].value,
        time: timeAgo
      };
      transactions.push(transactionObject);
    }
    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

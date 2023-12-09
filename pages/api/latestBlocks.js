// pages/api/latestBlocks.js
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

    // Fetch block details for the last 6 blocks
    const blockDetails = [];
    for (let i = latestBlockNumber; i > latestBlockNumber - 6; i--) {
      const blockResponse = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_getBlockByNumber',
          tag: `0x${i.toString(16)}`,
          apiKey: apiKey,
          boolean: true,
        },
      });

      const blockData = blockResponse.data.result;
      const timestamp = parseInt(blockData.timestamp, 16) * 1000; // Convert to milliseconds
      const timeAgo = Math.floor((Date.now() - timestamp) / 1000); // Time in seconds

      blockDetails.push({
        blockHeight: i,
        timestamp: timestamp,
        timeAgo: timeAgo,
        txnHash: blockData.transactions[0],
      });
    }

    res.json({ latestBlocks: blockDetails });
  } catch (error) {
    console.error('Error fetching latest block details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

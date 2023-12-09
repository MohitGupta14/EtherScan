// pages/api/totalTransactionsCount.js
import axios from 'axios';

export default async function handler(req, res) {
  const YOUR_ETHERSCAN_API_KEY = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'stats',
        action: 'ethsupply',
        apikey: YOUR_ETHERSCAN_API_KEY,
      },
    });

    const totalTransactionsCount = response.data.result;
    
    return res.status(200).json({ totalTransactionsCount });
  } catch (error) {
    console.error(`Error fetching total transactions count: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// pages/api/ethereum-price.js
import axios from 'axios';

export default async function handler(req, res) {
  const YOUR_ETHERSCAN_API_KEY = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

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
}

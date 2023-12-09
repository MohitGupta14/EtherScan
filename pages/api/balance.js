// pages/api/balance.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { address } = req.query;
    const YOUR_ETHERSCAN_API_KEY = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';

    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'balance',
        address: address,
        tag: 'latest',
        apikey: YOUR_ETHERSCAN_API_KEY,
      },
    });

    const getBalance = response.data.result;
    return res.status(200).json({ getBalance });
  } catch (error) {
    console.error(`Error fetching latest balance: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

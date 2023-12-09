// pages/api/ethGasPrice.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiKey = 'G3UWE3PSHIHTRVKSX6SYXEKXG4TIPFGPZ8';
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const gasPrice = response.data.result.ProposeGasPrice;

    res.json({ gasPrice });
  } catch (error) {
    console.error('Error fetching gas price:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

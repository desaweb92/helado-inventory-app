const axios = require('axios');
exports.getDolarRate = async (req, res) => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const dolarRate = response.data.rates.VES;
    res.json({ dolarRate });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

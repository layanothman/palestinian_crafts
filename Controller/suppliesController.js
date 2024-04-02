const axios = require('axios');
const apiKey = 'SkuRemote_Layan_1711975103';

exports.searchSupplies = async (req, res) => {
  const { keyword } = req.query;

  try {
    const response = await axios.get(`https://api.skugrid.com/v1/search?q=${keyword}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`api_key:${apiKey}`).toString('base64')}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching supply data' });
  }
};
// module.exports=suppliesController
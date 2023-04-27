const cheerio = require('cheerio');
const axios = require('axios');

const checkWebsite = async (url, textToLookFor) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const pageText = $('body').text();
    return pageText.includes(textToLookFor);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { checkWebsite };
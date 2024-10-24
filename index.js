const axios = require("axios");
const dotenv = require("dotenv");
const { exportAsCsvs, exportAsWord } = require("./functions");

dotenv.config();

const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
const SHOP_NAME = process.env.SHOP_NAME;

if (!API_KEY) {
  throw new Exception("API KEY is required");
}

if (!PASSWORD) {
  throw new Exception("PASSWORD is required");
}

if (!SHOP_NAME) {
  throw new Exception("SHOP NAME is required");
}

const url = `https://${API_KEY}:${PASSWORD}@${SHOP_NAME}/admin/api/2024-01/articles.json`;

axios
  .get(url)
  .then((response) => {
    const articles = response.data.articles;    
    const formattedArticle = articles.map((article) => ({
      ...article,
      image: article.image ? article.image.src : "",
    }));

    try {
      // exportAsCsvs(parser, formattedArticle); //** uncomment that for exporting as CSV */
      exportAsWord(formattedArticle);
    } catch (err) {
      console.error("Error generating the files:", err);
    }
  })
  .catch((error) => {
    console.error("Error fetching data from Shopify API:", error);
  });

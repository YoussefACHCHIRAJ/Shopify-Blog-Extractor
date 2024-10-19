const axios = require("axios");
const fs = require("fs");
const { Parser } = require("json2csv");
const dotenv = require("dotenv");

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
    // Prepare the fields you want to export
    const fields = [
      "title",
      "body_html",
      "summary_html",
      "published_at",
      "image",
      "author",
      "handle",
    ];
    const parser = new Parser({ fields });
    const formattedArticle = articles.map((article) => ({
      title: article.title,
      body_html: article.body_html,
      published_at: article.published_at,
      author: article.author,
      handle: article.handle,
      image_src: article.image ? article.image.src : "",
    }));

    try {
      const csv = parser.parse(formattedArticle);
      // Save the CSV to a file
      fs.writeFile(`uploads/shopify_blogs_${Date.now()}.csv`, csv, (err) => {
        if (err) throw err;
        console.log("Blog data has been exported to shopify_blogs.csv");
      });
    } catch (err) {
      console.error("Error generating CSV:", err);
    }
  })
  .catch((error) => {
    console.error("Error fetching data from Shopify API:", error);
  });

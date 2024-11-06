# BlogVault Exporter

BlogVault Exporter is a Node.js app that allows you to export blog posts and articles from your Shopify store into a CSV format. This tool helps you manage and back up your blog content, making it easy to extract article titles, content, publication dates, and more for external use.

## Features

    Export Shopify blog posts as CSV and Word
    Capture essential fields such as title, content, publication date, and author
    Simple and easy-to-use interface with Node.js and Axios

## Prerequisites

Before using the app, make sure you have the following:

    Node.js installed on your system
    A Shopify Custom App with API permissions for reading blog content
    API Key and Admin API Access Token (password) from your Shopify Custom App

## Installation
Clone the Repository:

```bash
git clone git@github.com:YoussefACHCHIRAJ/Shopify-Blog-Extractor.git
cd Shopify-Blog-Extractor
```

## Install Dependencies: Install the required Node.js packages:

```bash
npm install
```

## Configure Environment Variables: 
Create a .env file in the root of the project and add your Shopify store credentials:

```bash
touch .env
```

Then, open the .env file and add your Shopify API credentials:

```makefile
    API_KEY=your-api-key
    PASSWORD=your-admin-api-access-token
    SHOP_NAME=your-shop-name.myshopify.com
```

## Usage

Run the script to export your Shopify blog posts:

```bash
node index.js
```
The exported blog posts will be saved as a shopify_blogs.csv file in the uploads folder or each blog will be saved as a word file in the uploads/words folder.

## Dependencies

    Axios - For making HTTP requests to the Shopify API
    json2csv - For converting JSON data to CSV format
    dotenv - For loading environment variables from .env file
    fs - Node.js file system module for saving CSV files

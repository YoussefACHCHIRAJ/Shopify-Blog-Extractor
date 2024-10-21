const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");
const { Parser } = require("json2csv");

const exportAsCsvs = (articles) => {
    const folderName = `uploads/csvs`;

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
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
  const csv = parser.parse(articles);
  const formatedFileName = `${folderName}/shopify_blogs_${Date.now()}.csv`;
  // Save the CSV to a file
  fs.writeFile(formatedFileName, csv, (err) => {
    if (err) throw err;
    console.log(`Blog data has been exported to ${formatedFileName}`);
  });
};

const exportAsWord = (articles) => {
  const folderName = `uploads/words/word_${Date.now()}`;

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }

  articles.forEach((article, _index) => {
    // Create paragraphs for the title and body
    const title = new Paragraph({
      children: [
        new TextRun({
          text: article.title,
          bold: true,
          size: 28, // Title size
        }),
      ],
      spacing: { after: 300 },
    });

    const body = new Paragraph({
      children: [
        new TextRun({
          text: article.body_html, 
        }),
      ],
      spacing: { after: 300 },
    });

    const doc = new Document({
        creator: "Youssef ACHCHIRAJ - SHOPIFY EXPORT APP",
        title: article.title,
        description: `Exported blog article titled: ${article.title}`,
        sections: [{
            children: [title, body]
        }]
      });
    
      Packer.toBuffer(doc)
      .then((buffer) => {
        const savedBlogName = `${folderName}/shopify_blogs_${Date.now()}.docx`;
        fs.writeFileSync(savedBlogName, buffer);
        console.log(
          `Article "${article.title}" has been exported to ${savedBlogName}`
        );
      })
      .catch((error) => {
        console.error(
          `Error generating Word document for article "${article.title}":`,
          error
        );
      });
  });
};

module.exports = { exportAsCsvs, exportAsWord };

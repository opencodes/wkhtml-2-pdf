const express = require('express');
const app = express();
const wkhtmltopdf = require('node-wkhtmltopdf');
const fs = require('fs');

const product = {
    id: 1,
    name: 'product1'
};
app.get('/', (req, res) => {
    res.send({ message: 'Product not found' });
})

app.get('/products/:id', (req, res) => {
    console.log('pdf');
    const html = `<!DOCTYPE html>
    <html lang="en">
    <body>
      <div>
        <h1>Level 1</h1>
        <h2>Level 2</h2>
      </div>
    </body>
    </html>`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=product-${req.params.id}.pdf`);
    var options = [
        '--quiet',
        '--margin-bottom 1',
        '--margin-left 1',
        '--margin-right 1',
        '--margin-top 1',
        'toc',
    ];
    const doc = wkhtmltopdf(options, html);
    return doc.stdout.pipe(res);
});

const port = process.env.PORT || 4100;

app.listen(port, () => {
    console.log(`Product API listening on port ${port}!`);
});

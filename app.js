const express = require('express');
const app = express();
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

const product = {
    id: 1,
    name: 'product1'
};
app.get('/', (req, res) => {
    res.send({ message: 'Product not found' });
})

app.get('/products/:id', (req, res) => {
    const html = `<h1>Hello World! ${req.params.id}</h1>`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=product-${req.params.id}.pdf`);
    wkhtmltopdf(html, { pageSize: 'letter', spawnOptions: { shell: true } }).pipe(res);
});

const port = process.env.PORT || 4100;

app.listen(port, () => {
    console.log(`Product API listening on port ${port}!`);
});

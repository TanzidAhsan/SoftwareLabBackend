const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'GroceryStoreDB'
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

 
app.post('/products', (req, res) => {
  const { name, price, quantity } = req.body;

  const query = 'INSERT INTO Products (name, price, quantity) VALUES (?, ?, ?)';
  connection.query(query, [name, price, quantity], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Product added successfully!', id: results.insertId });
  });
});

 
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM Products';
  connection.query(query, (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results);
  });
});

 
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  const query = 'UPDATE Products SET name = ?, price = ?, quantity = ? WHERE id = ?';
  connection.query(query, [name, price, quantity, id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Product updated successfully!' });
  });
});

 
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Products WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Product deleted successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const e = require('express');
const server = express();

server.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_pv'
});

connection.connect(function(err) {
  if (err){
    console.log('Error connecting to Db');
  }
  else{
    console.log('Connection ssuccesful');
  }
});

server.listen(4000, function check(err){
  if (err) {
    console.log('Error');} 
    else {
      console.log('Server is running on port 4000');
    }
  
});

server.get('/api/products/AllProducts', function(req, res) {
  connection.query('SELECT * FROM products', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

server.post('/api/products/add', function(req, res) {
  let products = {
    code : req.body.code,
    name: req.body.name,
    quantity: req.body.quantity,
    expiration: req.body.expiration,
    description: req.body.description,
    price: req.body.price,
    cost: req.body.cost,
  };
  let sql = 'INSERT INTO products SET ?';
  connection.query(sql, products, function(err) {
    if (err) {
      res.send({status: 'error', message: 'Product not added'});
    } else {
      res.send({status: 'success', message: 'Product added'});
    }
  });
});

server.post('/api/products/update', function(req, res) {
  let products = {
    code : req.body.code,
    name: req.body.name,
    quantity: req.body.quantity,
    expiration: req.body.expiration,
    description: req.body.description,
    price: req.body.price,
    cost: req.body.cost,
  };
  let sql = 'UPDATE products SET ? WHERE code = ?';
  connection.query(sql, [products, products.code], function(err) {
    if (err) {
      res.send({status: 'error', message: 'Product not updated'});
    } else {
      res.send({status: 'success', message: 'Product updated'});
    }
  });
});

server.post('/api/products/upd/:code', function(req, res) {
  const updateProduct = 'UPDATE products SET name=?, quantity=?, expiration=?, description=?, price=?, cost=? WHERE code=?';
const values = [
  req.body.name,
  req.body.quantity,
  req.body.expiration,
  req.body.description,
  req.body.price,
  req.body.cost,
  req.body.code
];

connection.query(updateProduct, values, function(err) {
  if (err) {
    res.send({ status: 'error', message: 'Product not updated' });
  } else {
    res.send({ status: 'success', message: 'Product updated' });
  }
});

});

server.post('/api/products/delete', function(req, res) {
  let products = {
    code : req.body.code
  };
  let sql = 'DELETE FROM products WHERE code = ?';
  connection.query(sql, [products.code], function(err) {
    if (err) {
      res.send({status: 'error', message: 'Product not deleted'});
    } else {
      res.send({status: 'success', message: 'Product deleted'});
    }
  });
});
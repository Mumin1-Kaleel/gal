const express = require('express');
const app = express();
//const bp = require('body-parser');
const search_model = require('./search_model');
const borrower_model = require('./borrower_model');
const home_model = require('./home_model');
const fine_model = require('./fine_model');
//app.use(bp.json());
//app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  }); 

app.post('/Search', function(req, res){
    console.log("test4");
    search_model.findBook(req.body)
    .then(response => {
      console.log("test5");
      res.status(200).send(response); //output to page (status() has hTTP code for output)
    })
    .catch(error => {
      console.log("test6");
      res.status(500).send(error);
    })
});

app.post('/Search/:CardID', function(req, res){
  console.log("testlo");
  search_model.checkOutBook(req.body, req.params.CardID)
  .then(response => {
    console.log("testwo");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("testmo");
    res.status(500).send(error);
  })
});

app.get('/Search/:ISBN', function(req, res){
  console.log("test9");
  search_model.getAvailable(req.params.ISBN)
  .then(response => {
    console.log("test10");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("test11");
    res.status(500).send(error);
  })
});

app.post('/AddBorrower', function(req, res){
  console.log("test0");
  borrower_model.createBorrower(req.body)
  .then(response => {
    console.log("testb");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("testc");
    res.status(500).send(error);
  })
});

app.get('/home/:card', function(req, res){
  console.log("test9");
  home_model.getLoanedBooks(req.params.card)
  .then(response => {
    console.log("test10");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("test11");
    res.status(500).send(error);
  })
});

app.get('/home/:LoanID/:Cost', function(req, res){
  console.log("test09");
  home_model.createFines(req.params.LoanID, req.params.Cost)
  .then(response => {
    console.log("test010");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("test011");
    res.status(500).send(error);
  })
});

app.post('/home', function (req, res) {
  console.log("mb g");
  home_model.checkInBooks(req.body)
  .then(response => {
    console.log("test10");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("test11");
    res.status(500).send(error);
  })
});

app.get('/fine/:card', function(req, res){
  console.log("test90");
  fine_model.getFines(req.params.card)
  .then(response => {
    console.log("test100");
    res.status(200).send(response); //output to page (status() has hTTP code for output)
  })
  .catch(error => {
    console.log("test110");
    res.status(500).send(error);
  })
});

app.listen(3000, () => console.log('API is running on http://localhost:3000/search'));
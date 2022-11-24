const express = require('express');
const app = express();
//const bp = require('body-parser');
const search_model = require('./search_model');
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

app.listen(3000, () => console.log('API is running on http://localhost:3000/search'));
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '4347Proj',
  password: 'Mankada!23',
  port: 5432,
});

const findBook = (body) => { 
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(body);
    ISBN = String(body[keys[0]]);
    console.log(typeof ISBN === 'undefined');
    console.log(ISBN == '')
    if(ISBN == ''){
      ISBN = 'sadfasdfdsafasfd';
    }
    Title = String(body[keys[1]]);
    if(Title == ''){
      Title = 'asdfdfasdfsdafasd';
    }
    Author = String(body[keys[2]]);
    if(Author == ''){
      Author = 'fdsfasddsfasdfsdf';
    }
    console.log("testk");
    console.log(ISBN);;
    console.log(ISBN == null);
    console.log(Title);
    console.log(Author);
    pool.query('SELECT * FROM Book WHERE Isbn10 LIKE \'%\' || $1 || \'%\' OR Title LIKE \'%\' || $2 || \'%\' OR Author LIKE \'%\' || $3 || \'%\'',
    [ISBN,Title,Author],
      (error, results) => {
      if (error) { //error handling
        console.log("testg");
        reject(error);
      }
      if(results == null){
        console.log("testr");
        console.log(results);
        resolve(`Search Invalid!`); //display rows in the database in form of json
      }
      else{
        console.log("testm");
        console.log(results.rows);
        resolve(results.rows);
      }
    });
  });
};

const getAvailable = (body) => {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(body);
    ISBN = String(body[keys[0]]);
    pool.query('SELECT * FROM Book_Loans WHERE ISBN10 = $1 AND (Date_Out IS NULL OR (Date_In IS NOT NULL AND Date_Out IS NOT NULL))',
    [ISBN],
    (error, result) => {
      if(error) {
        reject(error);
      }
      if(result.rowCount == 0){
        resolve('Yes');
      }
      else{
        resolve('No');
      }
    })
  })
}

  module.exports = {  
    findBook,
    getAvailable,
  };
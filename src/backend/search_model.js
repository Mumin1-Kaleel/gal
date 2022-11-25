const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Afridi.4203$',
  port: 5432,
});

const findBook = (body) => { 
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(body);
    ISBN = String(body[keys[0]]);
    if(ISBN == ''){
      ISBN = 'asdljkaDKLJHjdhskshdflkjhadjkhadfjladksfhkjhdfjklhadjklhfdjkhasjdkf';
    }
    Title = String(body[keys[1]]);
    if(Title == ''){
      Title = 'asdljkaDKLJHjdhskshdflkjhadjkhadfjladksfhkjhdfjklhadjklhfdjkhasjdkf';
    }
    Author = String(body[keys[2]]);
    if(Author == ''){
      Author = 'asdljkaDKLJHjdhskshdflkjhadjkhadfjladksfhkjhdfjklhadjklhfdjkhasjdkf';
    }
    pool.query('SELECT * FROM Book WHERE Isbn10 LIKE \'%\' || $1 || \'%\' OR Title LIKE \'%\' || $2 || \'%\' OR Author LIKE \'%\' || $3 || \'%\'',
    [ISBN,Title,Author],
      (error, results) => {
      if (error) { //error handling
        reject(error);
      }
      if(results == null){
        resolve(`Search Invalid!`); //display rows in the database in form of json
      }
      else{
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
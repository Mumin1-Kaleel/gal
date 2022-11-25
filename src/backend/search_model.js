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
    Title = String(body[keys[1]]);
    Author = String(body[keys[2]]);
    pool.query('SELECT * FROM Book WHERE Isbn10 = $1 AND Title = $2 AND Author = $3',
    [ISBN,Title,Author],
      (error, results) => {
      if (error) { //error handling
        reject(error);
      }
      if(results == null){
        resolve(`Search Invalid!`); //display rows in the database in form of json
      }
      else{
        resolve(results.rows[0]);
      }
    });
  });
};

const getAvailable = (body) => {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(body);
    ISBN = String(body[keys[0]]);
    pool.query('SELECT * FROM Book_Loans WHERE ISBN10 = $1 AND Date_In IS NULL',
    [ISBN],
    (error, result) => {
      if(error) {
        reject(error);
      }
      if(result.rowCount == 0){
        resolve(true);
      }
      else{
        resolve(false);
      }
    })
  })
}

  module.exports = {  
    findBook,
    getAvailable,
  };
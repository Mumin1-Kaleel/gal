const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '4347Proj',
  password: 'Mankada!23',
  port: 5432,
});

//query into database object
/* const getBooks = () => {
    return new Promise(function(resolve,reject) {
        pool.query('SELECT * FROM Book', 
        (error, results) => {
            if(error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
} */
//query for viewing all merchants and their info according to id
const findBook = (body) => { 
    return new Promise(function (resolve, reject) {
      console.log(body);
      console.log("test5");
      console.log(typeof body);
      let keys = Object.keys(body);
      ISBN = String(body[keys[0]]);
      Title = String(body[keys[1]]);
      Author = String(body[keys[2]]);
      console.log(ISBN);
      console.log(Title);
      console.log(Author);
      pool.query('SELECT * FROM Book WHERE Isbn10 = $1 AND Title = $2 AND Author = $3',
      [ISBN,Title,Author],
       (error, results) => {
        if (error) { //error handling
            console.log("test8");
            reject(error);
        }
        if(results == null){
            console.log("test7");
            resolve(`Login Invalid!`); //display rows in the database in form of json
        }
        else{
            console.log(results.rows[0]);
            resolve(results.rows[0]);
        }
      });
    });
  };

  module.exports = {
    //getBooks,  
    findBook,
  };
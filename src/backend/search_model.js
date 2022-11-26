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

const checkOutBook = (body, ID) => {
  console.log("bello");
  console.log(body);
  console.log(body.length);
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM Book_Loans WHERE CardID = $1',
    [ID],
    (error, result) => {
      if(error) {
        console.log("hello");
        reject(error);
      }
      if(parseInt(result.rowCount) + parseInt(body.length) > 3){
        console.log("frello");
        resolve(`Too many books, only 3 loans allowed on Card!`);
      }
      else{
        var LID = 1;
        pool.query('SELECT * FROM Book_Loans ORDER BY LoanID DESC LIMIT 1',
          (error, result) => {
            if(error) {
              console.log("cello");
              reject(error);
            }
            if(result.rowCount != 0){
              let keys2 = Object.keys(result.rows[0]);
              LID = String(result.rows[0][keys2[0]]);
              LID = parseInt(LID) + 1;
            }
            const calender = new Date();
            const today = String(calender.getFullYear()) + "-" + String(calender.getMonth() + 1) + "-" + String(calender.getDate());
            calender.setDate(calender.getDate() + 14);
            const dueDate = String(calender.getFullYear()) + "-" + String(calender.getMonth() + 1) + "-" + String(calender.getDate());
            //var ISBNs = JSON.parse(body);
            for(let i = 0; i < body.length; i++){
              console.log(body[i]);
              console.log(String(LID));
              console.log(ID.substring(1));
              console.log(today);
              console.log(dueDate);
              pool.query('SELECT * FROM Book_Loans WHERE Isbn10 = $1 AND CardID = $2 AND Date_In IS NULL',
                [body[i], ID.substring(1)],
                (error, result) => {
                  if(error) {
                    console.log("pello");
                    console.log(result);
                    reject(error);
                  }
                  if(result.rowCount != 0){
                    resolve('Book already checked out!');
                  }
                  else{
                    pool.query('INSERT INTO Book_Loans(LoanID, isbn10, cardid, date_out, due_date) VALUES ($1, $2, $3, $4, $5)',
                      [String(LID), body[i], ID.substring(1), today, dueDate],
                      (error, result) => {
                        if(error) {
                          console.log("pello");
                          console.log(result);
                          reject(error);
                        }
                        console.log(result);
                        resolve(`A new borrower has been added added!`)
                    })
                    LID = LID + 1;
                  }
              })
            }
        })
      }
    })
  })
}

const getAvailable = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    console.log("kaleel");
    console.log(ISBN);
    pool.query('SELECT * FROM Book_Loans WHERE ISBN10 = $1 AND (Date_In IS NULL AND Date_Out IS NOT NULL)',
    [body.substring(1)],
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
    checkOutBook,
  };
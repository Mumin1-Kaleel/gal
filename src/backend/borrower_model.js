const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '4347Proj',
  password: 'Mankada!23',
  port: 5432,
});

const createBorrower = (body) => { 
    return new Promise(function (resolve, reject) {
        console.log("test16");
        let keys = Object.keys(body);
        Name = String(body[keys[0]]);
        Name = Name.split(" ");
        FName = Name[0];
        LName = Name[1];
        SSN = String(body[keys[1]]);
        Address = String(body[keys[2]]);
      
        pool.query('SELECT * FROM Borrower WHERE SSN = $1',
            [SSN],
            (error, results) => {
            if (error) { //error handling
                reject(error);
            }
            if(results.rowCount != 0){
                resolve(`Account already exists!`);
            }
            else{
                pool.query('SELECT * FROM Borrower ORDER BY CardID DESC LIMIT 1',
                    (error, results) => {
                    if (error) { //error handling
                        console.log("test15");
                        reject(error);
                    }
                    let keys2 = Object.keys(results.rows[0]);
                    CardID = String(results.rows[0][keys2[0]]);
                    console.log(CardID);
                    CardID = CardID.substring(2);
                    console.log(CardID);
                    CardID = parseInt(CardID) + 1;
                    console.log(CardID);
                    CardID = "ID" + String(CardID);
                    pool.query('INSERT INTO Borrower(CardID, FName, LName, SSN, Address) VALUES ($1, $2, $3, $4, $5)',
                        [CardID, FName, LName, SSN, Address],
                        (error, results) => {
                        if (error) { //error handling
                            reject(error);
                        }
                        resolve(`A new borrower has been added added: ${results.rows[0]}`)
                    }); 
                });
            }
        });
    });
  };

  /* const addLoan = (body) => {
    return new Promise(function (resolve, reject) {
        const calender = new Date();
        today = String(calender.getFullYear()) + "-" + String(calender.getMonth() + 1) + "-" + String(calender.getDate());
        due = String(calender.getFullYear()) + "-" + String(calender.getMonth() + 1) + "-" + String(calender.getDate() + 14);
        
    })
  } */

  module.exports = {  
    createBorrower,
  };
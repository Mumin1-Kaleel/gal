const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '4347Proj',
  password: 'Mankada!23',
  port: 5432,
});

const getLoanedBooks = (body) => {
    return new Promise(function (resolve,reject) {
        console.log("zestyy");
        console.log(String(body));
        pool.query('SELECT * FROM Book_Loans WHERE CardID = $1 AND DATE_IN IS NULL',
        [String(body).substring(1)],
        (error, result) => {
            if(error){
                console.log("zesto");
                reject(error);
            }
            resolve(result.rows);
        })
    })
}

const checkInBooks = (body) => {
    return new Promise(function (resolve,reject) {
        console.log("zestyy");
        console.log(String(body));
        const calender = new Date();
        const today = String(calender.getFullYear()) + "-" + String(calender.getMonth() + 1) + "-" + String(calender.getDate());
        for(let i = 0; i < body.length; i++){
            console.log(body[i]);
            pool.query('UPDATE Book_Loans SET Date_In = $1 WHERE LOANID = $2',
            [today, String(body[i])],
            (error) => {
                if(error){
                    console.log("zesto");
                    reject(error);
                }
                resolve(`Book checked in!`);
            })
        }
    })
} 

const createFines = (LoanID, FineAmt) => {
    return new Promise(function (resolve,reject) {
        console.log("zesty2");
        console.log(String(LoanID));
        console.log(String(FineAmt));
        pool.query('SELECT * FROM Fines WHERE LoanID = $1',
            [String(LoanID).substring(1)],
            (error, result) => {
                if(error){
                    console.log("zestm");
                    reject(error);
                }
                if(result.rowCount == 0){
                    pool.query('INSERT INTO FINES(LoanID, Fine_Amt, Paid) VALUES($1, $2, $3)',
                    [String(LoanID).substring(1), parseFloat(String(FineAmt).substring(1)), false],
                    (error) => {
                        if(error){
                            console.log("zestm");
                            reject(error);
                        }
                        resolve(`Inserts Added!`);
                    })
                }
                else{
                    pool.query('UPDATE Fines SET Fine_Amt = $1, Paid = $2, WHERE LoanID = $3',
                    [parseFloat(String(FineAmt).substring(1)), false, String(LoanID).substring(1)],
                    (error) => {
                        if(error){
                            console.log("zest?");
                            reject(error);
                        }
                        resolve(`Updates Added!`);
                    })
                }
                
            })
    })
}

module.exports = {
    getLoanedBooks,
    checkInBooks,
    createFines,
}
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '4347Proj',
  password: 'Mankada!23',
  port: 5432,
});

const getFines = (body) => {
    return new Promise(function (resolve,reject) {
        console.log("zestyy");
        console.log(String(body));
        pool.query('SELECT Date_Out, Due_Date, Date_In, Fines.LoanID, Fines.Fine_Amt, Fines.Paid FROM Book_Loans, Fines WHERE Book_Loans.LoanID = Fines.LoanID AND CardID = $1',
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

const payFines = (body) => {
    return new Promise(function (resolve,reject) {
        console.log("zest[y");
        console.log(String(body));
        for(let i = 0; i < body.length; i++){
            console.log(body[i]);
            pool.query('UPDATE Fines SET Paid = $1 WHERE LOANID = $2',
            [true, String(body[i])],
            (error) => {
                if(error){
                    console.log("zesto");
                    reject(error);
                }
                resolve(`Fine Paid!`);
            })
        }
    })
} 

const getLoans = (body) => {
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

module.exports = {
    getFines,
    payFines,
    getLoans,
}
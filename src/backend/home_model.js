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
        pool.query('SELECT * FROM Book_Loans WHERE CardID = $1',
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
            pool.query('UPDATE Book_Loans SET Date_In = $1 WHERE ISBN10 = $2',
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

module.exports = {
    getLoanedBooks,
    checkInBooks,
}
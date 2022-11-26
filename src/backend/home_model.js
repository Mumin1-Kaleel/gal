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

module.exports = {
    getLoanedBooks,
}
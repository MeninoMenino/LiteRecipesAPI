//Arquivo de configuração da conexão com o banco

const mysql = require('mysql2');

var pool = mysql.createPool({
    "connectionLimit" : 100,
    "user": "root",
    "password": "1234",
    "database": "literecipes",
    "host": "localhost",
    "port": "3306"
});

//Consulta padrão no banco
exports.execute = (query, params = []) => {
    return new Promise ((resolve, reject) => {
        pool.query(
            query,
            params,
            (error, result, fields) => {
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

exports.pool = pool;
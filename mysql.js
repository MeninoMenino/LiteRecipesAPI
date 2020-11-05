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
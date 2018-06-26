/**
 * mysql database config
 **/

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '34.234.205.122',
    user: 'root',
    password: 'DWDStudent2017',
    database:'imdb',
    port: 3306
});
conn.connect();
console.log("Connect Mysql Success");
 
var selectSQL = 'SELECT * from actors LIMIT 10';
var insertSQL = 'insert into UserTB values("conan"),("fens.me")';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update"  where name="conan"';
 
 
//select
conn.query(selectSQL, function (err, rows) {
    if (err) console.log(err);
    console.log("SELECT ==> ");
    for (var i in rows) {
        console.log(rows[i]);
    }
});

conn.end();
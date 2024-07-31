var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require("fs");
const router = express.Router()
var cors = require('cors')

app.use(cors());


var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
})

var con = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10723205",
  password: "fwisxNeqpf",
  database: "sql10723205"
});


app.get('/', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      res.end( data );
   });
})
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

var qry =`SELECT * FROM users;`;
con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
  //  con.query(qry, function (err, results) {
  //     if (err) throw err;
  //     results.forEach((row) => {
  //        console.log(`ID: ${row['id']}, NAME: ${row['name']}`);
  //     });
  //  });
  //  con.end();
});




async function loginQuery(login, pass){
  // const rows = await con.query(
  //   `SELECT * FROM users WHERE login='${login}' AND pass='${pass}'`
  // );
  console.log('SELECT * FROM `users` ' + `WHERE login='${login}' AND pass='${pass}'`);
  const rows = await con.query('SELECT * FROM `users` ' + `WHERE login='${login}' AND pass='${pass}'`,
    function (err, results) {
    if (err) throw err;
    results.forEach((row) => {
       console.log(`ID: ${row['id']}, NAME: ${row['name']}`);
    });
    });
  
  return {
    rows
  }
}

app.get('/login', async function(req, res, next) {
  try {
    const { id } = req.params;
    con.query('SELECT * FROM `users` ', (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});

app.use(express.json());
app.post('/login', async function(req, res, next) {
  try {
    const { login, pass } = req.body;
    console.log(req);
    con.query('SELECT * FROM `users` WHERE login=? AND pass=? ', [login, pass], (err, results) => {

      if (err) throw err;
      res.json(results[0]);
    });
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
});
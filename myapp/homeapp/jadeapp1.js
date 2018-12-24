/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , logger = require('morgan');

var app = express()

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'pi',
  host: 'localhost',
  database: 'data',
  password: 'raspberry',
  port: 5432,
})
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {

const client = new Client({
  user: 'pi',
  host: 'localhost',
  database: 'data',
  password: 'raspberry',
  port: 5432,
})

client.connect()

client.query('SELECT id, description, device, service, characteristic, value, "timestamp" FROM lights.state',
             (err, res) => {
  console.log(err, res)
  client.end()
})
  
    var sql = require("mssql");

    var config = {
        user: 'sa',
        password: 'sjkaria',
        server: 'localhost',
        database: 'SchoolDB' 
    };

    sql.connect(config, function (err) {
        
        if (err) console.log(err);

        var request = new sql.Request();

        request.query('', function (err, recordset) {
            
            if (err) 
                console.log(err)
            else
                res.render('StateList', { stateList: recordset });
            
        });
    });
});

app.listen(3000)

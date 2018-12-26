/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , logger = require('morgan');

var format = require('pg-format')

var app = express()

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
  res.end('Hi there!')
})


var PGHOST='localhost'
var PGUSER = 'pi'
var PGDATABASE = 'data'
var PGPASSWORD = 'raspberry'
var listenport = 3000
//var age = 732

//var config = {
//  user: PGUSER, // name of the user account
//  host: PGHOST,
//  database: PGDATABASE, // name of the database
//  password: PGPASSWORD,
//  //port: listenport,
//  max: 10, // max number of clients in the pool
//  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
//}


app.get('/table', function (req, res) {
  const { Pool, Client } = require('pg')
  const pool = new Pool({
  user: PGUSER, // name of the user account
  host: PGHOST,
  database: PGDATABASE, // name of the database
  password: PGPASSWORD,
  //port: listenport,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
})
  pool.query('SELECT id, description, device, service, characteristic, value, timestamp FROM lights.state', (err, res) => {
  console.log(err, res)
  res.render('ValuesTable', { title: 'Values Tables', rows: rows })
  pool.end()
})

app.listen(3000)

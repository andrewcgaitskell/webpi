const express = require('express')
const app = express()
const pg = require('pg')
var format = require('pg-format')
var PGHOST='localhost'
var PGUSER = 'pi'
var PGDATABASE = 'data'
var PGPASSWORD = 'raspberry'
var listenport = 3000
//var age = 732

var config = {
  user: PGUSER, // name of the user account
  host: PGHOST,
  database: PGDATABASE, // name of the database
  password: PGPASSWORD,
  //port: listenport,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

//var pgConString = "postgres://localhost/bjorngylling"

//const pgConString = 'postgresql://pi:raspberry@localhost:3000/data'
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

var sql = 'SELECT id, description, device, service, characteristic, value, timestamp FROM lights.state'

gettablepage : pool.query(sql, (err, function(err, rows, fields) {
  if (err) throw err;
  res.render('valuestable', { title: 'Users', rows: rows }); 
  console.log(err, res);
  pool.end()
}));

app.get('/table', gettablepage);
                          


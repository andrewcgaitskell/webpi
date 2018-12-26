const express = require('express')
const app = express()

var pg = require('pg')
var format = require('pg-format')
var PGHOST='localhost'
var PGUSER = 'pi'
var PGDATABASE = 'data'
var PGPASSWORD = 'raspberry'
var listenport = 3000
var age = 732

require('dotenv').config()

var config = {
  user: PGUSER, // name of the user account
  host: PGHOST,
  database: PGDATABASE, // name of the database
  password: PGPASSWORD,
  //port: listenport,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)
var myClient

pool.connect(function (err, client, done) {
  if (err) console.log(err)
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
  myClient = client
  var ageQuery = format('SELECT * from lights.numbers WHERE age = %L', age)
  myClient.query(ageQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  })
})

const express = require('express')
var router = express.Router()
const app = express()
const pg = require('pg')
var format = require('pg-format')
var PGHOST='localhost'
var PGUSER = 'pi'
var PGDATABASE = 'data'
var PGPASSWORD = 'raspberry'
var listenport = 3000
//var age = 732

app.listen(3000)

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

pool.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  })
                          
router.get('/table', function (req, res) {
  res.send('Birds home page')
})

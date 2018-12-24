const pg = require('pg')

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

const connectionString = 'postgresql://pi:raspberry@localhost:3000/data'


pg.connect(pgConString, function(err, client) {
  if(err) {
    console.log(err);
  }
  client.on('notification', function(msg) {
    console.log(msg);
  });
  var query = client.query("LISTEN watchers");
});

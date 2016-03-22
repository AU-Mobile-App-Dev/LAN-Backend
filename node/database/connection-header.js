/**
 * Created by Rob on 2/18/2016.
 */
var exports = module.exports = {};
/*
 exports.getConnection = function() {
 mysql = require('mysql'),
 connectionpool = mysql.createPool({
 host: process.env.DBURL,
 user: process.env.DBUSER,
 password: process.env.DBKEY,
 database: 'heroku_4656e4fcc59f649'
 });
 return connectionpool;
 }
 */

exports.getConnection = function() {
    mysql = require('mysql'),
        connectionpool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'lan-social'
        });
    return connectionpool;
}

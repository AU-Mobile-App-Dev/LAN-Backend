/**
 * Created by Rob on 2/18/2016.
 */
var connectionpool = require('../connection-header.js').getConnection();
var exports = module.exports = {};
exports.getUsers = function(callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('SELECT * FROM users', function (err, rows) {
                if (err) {
                   callback(500);
                }
                else{
                     callback(rows);
                }
               
                connection.release();
            });
        }
    });
}

exports.getUserByName= function(username, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT * FROM users WHERE username = ?", username, function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }//If not results, user does not exist
                else if (results.length == 0) {
                    callback(204);
                }
                else{
                    callback(results);
                }
                
                connection.release();
            });
        }
    });
}
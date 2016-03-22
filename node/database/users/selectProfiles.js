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
                callback(rows);
                connection.release();
            });
        }
    });
}

exports.getUserByName= function(res, username){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            connection.query("SELECT * FROM users WHERE username = ?", username, function (err, results) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: "error",
                        json:results
                    });
                }//If not results, user does not exist
                else if (results.length == 0) {
                    return res.send({error: 'user does not exist'});
                }
                res.send({
                    result: 'success',
                    json: results
                });
                connection.release();
            });
        }
    });
}
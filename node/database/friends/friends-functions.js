var connectionpool = require('../connection-header.js').getConnection();
var exports = module.exports = {};

exports.addFriend = function(username, friendName, callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('INSERT INTO friends_list (user_id, friend_id) VALUES ((SELECT id FROM users WHERE username=?), (SELECT id FROM users WHERE username=?))',
            [username, friendName], function (err, rows) {
                if (err) {
                   callback(500);
                }
                else{
                     callback(201);
                }
               
                connection.release();
            });
        }
    });
}

exports.deleteFriend = function(username, friendName, callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('DELETE FROM friends_list WHERE user_id=(SELECT id FROM users WHERE username=?) AND friend_id=(SELECT id FROM users WHERE username=?)',
            [username, friendName], function (err, rows) {
                if (err) {
                   callback(500);
                }
                else{
                     callback(201);
                }
               
                connection.release();
            });
        }
    });
}

exports.getFriendsList= function(username, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT username FROM users, friends_list WHERE users.id = friends_list.friend_id AND friends_list.user_id = (SELECT id from users where username = ?)", username, function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }
                else if(results.length === 0){
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
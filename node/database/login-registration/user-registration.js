/**
 * Created by Rob Nice on 2/17/2016.
 */
var passwordFunctions = require('./password-functions.js');
/**Create connectionpool variable and immediately invoke the getConnection
 * method exported in connection-header.js*/
var connectionpool = require('../connection-header.js').getConnection();
/**Create exports variable*/
var exports = module.exports = {};



exports.regUser = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            
            if(err){
                callback(500);
            }
        } else {
                /**Hash the password before inserting it into the DB*/
                console.log("inserting user into database");
                userObject.password = passwordFunctions.hashString(userObject.password);
                connection.query('INSERT INTO users SET ?', userObject, function (err, rows) {
                    if (err) {
                        console.log(err);
                       callback(503);
                    }
                   else{
                       callback(201);
                   }
                    connection.release();
                });
        }

    });

}
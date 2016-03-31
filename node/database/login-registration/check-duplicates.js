/**
 * Created by Rob on 2/18/2016.
 * Module used to check for duplicate usernames and emails before inserting them into the database
 * If a duplicate is found, the reponse text should suffice handling the tooltip text for letting the user
 * know what the exact problem is.
 */
var connection = require('../connection-header.js').getConnection();
var loginRegFunctions = require('./user-registration.js');
var exp = module.exports = {};

exp.isDuplicate = function(userObject, callback){
    console.log("Checking for duplicate username");
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        connection.query('SELECT username FROM users WHERE username = ?',userObject.username, function (err, results) {
            if (err){
                callback(503);
            } 

            if (results.length !== 0) {
               callback({"Error": "Duplicate username"});
            }
            else{
                //Start checking for duplicate emails, if username is not taken
            checkEmail(userObject, callback);
            }

          
        });
        connection.release();
       

    });
}

checkEmail = function(userObject, callback){
    console.log("Checking for duplicate email");
    connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503); 
        }
        connection.query('SELECT username FROM users WHERE email = ?', userObject.email, function (err, results) {
            if (err) {
                callback(500);
            }

            if (results.length !== 0) {
                callback({"Error":"Email already registered"});
            }else{
               loginRegFunctions.regUser(userObject, callback);
            }

        });
        connection.release();
    });
}

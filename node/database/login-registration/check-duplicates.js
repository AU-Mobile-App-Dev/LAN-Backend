/**
 * Created by Rob on 2/18/2016.
 * Module used to check for duplicate usernames and emails before inserting them into the database
 * If a duplicate is found, the reponse text should suffice handling the tooltip text for letting the user
 * know what the exact problem is.
 */
var connection = require('../connection-header.js').getConnection();
var loginRegFunctions = require('./user-registration.js');
var exp = module.exports = {};

exp.isDuplicate = function(userObject, res){
    console.log("Checking for duplicate username");
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('SELECT username FROM users WHERE username = ?', connection.escape(userObject.username), function (err, results) {
            if (err) return res.status(500).send('Error connecting to database.');

            if (results.length !== 0) {
                return res.send({error: 'Username exists'});
            }

          //Start checking for duplicate emails, if username is not taken
            checkEmail(userObject, res);
        });
        connection.release();
       

    });
}

checkEmail = function(userObject, res){
    console.log("Checking for duplicate email");
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('SELECT username FROM users WHERE email = ?', connection.escape(userObject.email), function (err, results) {
            if (err) return res.status(500).send('Error connecting to database.');

            if (results.length !== 0) {
                return res.send({error: 'Email already registered'});
            }else{
               loginRegFunctions.regUser(userObject, res);
            }

        });
        connection.release();
    });
}

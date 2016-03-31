var passwordFunctions = require('./password-functions.js');
var connectionpool = require('../connection-header.js').getConnection();
var randomstring = require("randomstring");

/**Create exports variable*/
var exports = module.exports = {};



exports.generateKey = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("SELECT username, password FROM users WHERE username = ?", userObject.username, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                   if(passwordFunctions.compareStrings(userObject.password, row[0].password)){
                       //Generate apikey, insert it into the user's table and send the key back for the response
                       var apiKey = row[0].username + randomstring.generate();
                       apiKey = passwordFunctions.hashString(apiKey).toString();
                       insertKey(apiKey, userObject.username);
                       callback(true, apiKey);
                      
                   }
                    else{
                        
                        callback(false, null);
                    }   
                    
                    
                    connection.release();
                });
        }
        
    });
}

exports.verifyKey = function(key, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("SELECT * FROM users WHERE api_key = ?", key, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                   if(row.length === 1){
                       callback(true);
                      
                   }
                    else{
                        callback(false);
                    }   
                    
                    
                    connection.release();
                });
        }
        
    });
}

insertKey = function(key, username){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("UPDATE users SET api_key = ? WHERE username = ?", [key, username], function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        
                    }
                
                    connection.release();
                });
        }
        
    });
}
 


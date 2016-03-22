var passwordFunctions = require('./password-functions.js');
var connectionpool = require('../connection-header.js').getConnection();
var randomstring = require("randomstring");
var setSession = require('./session-functions.js');
/**Create exports variable*/
var exports = module.exports = {};



exports.authenticate = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("SELECT password, id FROM users WHERE username = ?", userObject.username, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                   if(passwordFunctions.compareStrings(userObject.password, row[0].password)){
                       //Generate session id, insert it to the database and return in response
                       var session = randomstring.generate();
                       setSession.setSession(session, row[0].id);
                       callback(true, session);
                      
                   }
                    else{
                        
                        callback(false, null);
                    }   
                    
                    
                    connection.release();
                });
        }
        
    });
    
   
}

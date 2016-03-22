var passwordFunctions = require('./password-functions.js');
var connectionpool = require('../connection-header.js').getConnection();
/**Create exports variable*/
var exports = module.exports = {};



exports.setSession = function(session, userId){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("UPDATE users SET session = ? WHERE id= ?", [session, userId], function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(row);
                   
                    connection.release();
                });
        }
        
    });
    
   
}

exports.getSession = function(username, session, callback){
     connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("SELECT session from users WHERE username =?",username, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    if(row[0].session = session){
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

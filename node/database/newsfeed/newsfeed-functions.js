var connection = require('../connection-header.js').getConnection();
var randomstring = require('randomstring');
var passwordFunctions = require('./password-functions.js');

var exp = module.exports = {};

exp.getNewsFeedByUsername = function(username, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE username = ?)', username
        , function (err, results) {
            if (err){callback(500)}
             else if(result.length === 0){
                callback(204);
            }
            else{callback(result);}

        });
        }
        connection.release();
      
    });   
}

exp.getNewsFeedByApikey = function(apikey, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
            apikey = passwordFunctions.hashString(apikey).toString();
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE api_key = ?)', apikey
        , function (err, result) {
            if (err){callback(500)}
            else if(result.length === 0){
                callback(204);
            }
            else{callback(result);}

        });
        }
        connection.release();
      
    });   
}


exp.getNewsFeedByID = function(username, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE username = ?)', username
        , function (err, result) {
            if (err){callback(500)}
             else if(result.length === 0){
                callback(204);
            }
            else{callback(result);}

        });
        }
        connection.release();
      
    });   
}

exp.addNewsfeedItemByApikey = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
        var genKey = randomstring.generate(6);
         var apikey = passwordFunctions.hashString(newsObject.apikey).toString();
         console.log(genKey);
        connection.query('INSERT INTO newsfeed (id, user_id, timestamp, message) VALUES (?, (SELECT id FROM users WHERE api_key = ?), ?, ?)',
        [genKey, apikey, newsObject.timestamp, newsObject.message], function (err, results) {
            if (err){ callback(500);
                console.log(err);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
        

    });   
}

exp.addNewsfeedItemBySessionkey = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            callback(503);
        }
        else{
            var genKey = randomstring.generate(6);
        connection.query('INSERT INTO newsfeed (id, user_id, timestamp, message) VALUES (?, (SELECT id FROM users WHERE session = ?), ?, ?)',
        [genKey, newsObject.session, newsObject.timestamp, newsObject.message], function (err, results) {
            if (err){ callback(500);}
            else{
                console.log(results);
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}

exp.removeNewsfeedItemByApikey = function(userObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
            userObject.apikey = passwordFunctions.hashString(userObject.apikey).toString();
        connection.query('DELETE FROM newsfeed WHERE id = ? AND user_id = (SELECT id FROM users WHERE api_key = ?)',
        [userObject.newsfeedItemID, userObject.apikey], function (err, results) {
            if (err) {callback(500);}
            else if(results.affectedRows === 0){
                callback(204);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}

exp.removeNewsfeedItemBySession = function(userObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
            userObject.apikey = passwordFunctions.hashString(userObject.apikey).toString();
        connection.query('DELETE FROM newsfeed WHERE id = ? AND user_id = (SELECT id FROM users WHERE session = ?)',
        [userObject.newsfeedItemID, userObject.session], function (err, results) {
            if (err) {callback(500);}
            else if(results.affectedRows === 0){
                callback(204);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}
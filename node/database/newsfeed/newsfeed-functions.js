var connection = require('../connection-header.js').getConnection();

var exp = modules.exports = {};

exp.getNewsFeed = function(sort, order, res, userObject){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE username = ?)', username
        , function (err, results) {
            if (err){callback(500)}
            else{callback(result);}

        });
        connection.release();
      
    });   
}

exp.addNewsfeedItem = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('INSERT INTO newsfeed (user_id, timestamp, message) VALUES ((SELECT id FROM users WHERE username = ?), ?, ?)',
        [newsObject.username, newsObject.timestamp, newsObject.message], connection.escape(userObject.username), function (err, results) {
            if (err) return res.status(500).send('Error connecting to database.');

            if (results.length !== 0) {
                return res.send({error: 'duplicate username'});
            }

          //Start checking for duplicate emails, if username is not taken
            checkEmail(userObject, res);
        });
        connection.release();
       

    });   
}

exp.removeNewsfeedItem = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('DELETE FROM newsfeed WHERE id = ? AND ((SELECT id FROM users WHERE username = ?), ?, ?)',
        [newsObject.username, newsObject.timestamp, newsObject.message], connection.escape(userObject.username), function (err, results) {
            if (err) return res.status(500).send('Error connecting to database.');

            if (results.length !== 0) {
                return res.send({error: 'duplicate username'});
            }

          //Start checking for duplicate emails, if username is not taken
            checkEmail(userObject, res);
        });
        connection.release();
       

    });   
}
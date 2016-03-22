var connection = require('../connection-header.js').getConnection();

var exp = modules.exports = {};

exp.getNewsFeed = function(sort, order, res, userObject){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            return res.statusCode = 503;
        }
        connection.query('SELECT username FROM users WHERE username = ?', connection.escape(userObject.username), function (err, results) {
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
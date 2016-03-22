/**
 * Created by Rob Nice on 2/17/2016.
 */
var passwordFunctions = require('./password-functions.js');
/**Create connectionpool variable and immediately invoke the getConnection
 * method exported in connection-header.js*/
var connectionpool = require('../connection-header.js').getConnection();
/**Create exports variable*/
var exports = module.exports = {};



exports.regUser = function(userObject, res){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return res.status(500).send('Error connecting to database.');
        } else {
                /**Hash the password before inserting it into the DB*/
                userObject.password = passwordFunctions.hashString(userObject.password);
                connection.query('INSERT INTO users SET ?', userObject, function (err, rows) {
                    if (err) {
                        console.log(err);
                        return res.send({error: err.message});
                    }
                    res.send({
                        result: 'success'
                    });
                    connection.release();
                });
        }

    });

}
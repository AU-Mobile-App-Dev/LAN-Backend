/**
 * Created by Rob on 2/18/2016.
 */
var checkDups = require('./check-duplicates.js');
var regFunctions = require('./user-registration');
var authenticate = require('./authenticate.js');
var sessionFunctions = require('./session-functions');
var apiKeyFunctions = require('./apiKey-functions');

module.exports = {
    checkDups: checkDups.isDuplicate,
    regFunctions: regFunctions.regUser,
    authenticate: authenticate.authenticate,
    getSession: sessionFunctions.getSession,
    generateKey: apiKeyFunctions.generateKey,
    verifyKey: apiKeyFunctions.verifyKey
};
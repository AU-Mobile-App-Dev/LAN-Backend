var friendFunctions = require('../database/friends');
var errorCodes = require('./error-codes.js');
var geocoder = require('geocoder');

module.exports = function(app) {
    // ===============================
    // API REQUESTS for friends resource 
    // ===============================

    app.get('/api/friends/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                friendFunctions.getFriends(req.params.username, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });
    });
    
    app.delete('/api/friends/remove/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                friendFunctions.getFriends(req.params.username, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });
    });


    // =======================
    // GET REQUESTS =========
    // =======================

    // =======================
    // POST REQUESTS =========
    // =======================
    app.post('/friends', function(req, res) {
        sessions.getSession(req.body.username, req.body.session, function(result) {
            if (result) {
                friendFunctions.getFriends(req.body.username, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    })
                });
            } else {
                res.json({
                    403: "Unauthenticated request for friends list"
                });
            }
        });

    });
    
    // =======================
    // PUT REQUESTS ==========
    // =======================
    app.put('/friends/add', function(req, res) {
        sessions.getSession(req.body.username, req.body.session, function(result) {
            if (result) {
                friendFunctions.addFriend(req.body.username, req.body.friendName, function(result){
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    })
                });
            } else {
                res.json({
                    403: "Unauthenticated request for friends list"
                });
            }
        });

    });
        
    // =======================
    // DELETE REQUESTS =======
    // =======================
    app.delete('/friends/remove', function(req, res) {
        sessions.getSession(req.body.username, req.body.session, function(result) {
            if (result) {
                friendFunctions.deleteFriend(req.body.username, req.body.friendName, function(result){
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    })
                });
            } else {
                res.json({
                    403: "Unauthenticated request for friends list"
                });
            }
        });

    });


}
var selectProfiles = require('../database/users');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');
var geocoder = require('geocoder');

module.exports = function(app) {
    // =======================
    // API REQUESTS ==========
    // =======================

    app.get('/api/users/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                selectProfiles.getAllUsers(function(result) {
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

    app.get('/api/users/:username/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                selectProfiles.getUserByName(req.params.username, function(result) {
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
    app.get('/api/users/:location', function(req, res) {
      
                geocoder.geocode(req.params.location, function(err, data) {
                    if (err) {
                        res.json({
                            400: "Geocoder could not get the location, please check for syntax errors."
                        });
                    } else {
                        var coordinates = {
                            lat: data.results[0].geometry.location.lat,
                            lon: data.results[0].geometry.location.lng
                        };
                        selectProfiles.getUserByLocation(coordinates, function(result) {
                            errorCodes.responseCodeHandler(result, function(foundError, code) {
                                if (foundError) {
                                    res.json(code);
                                } else {
                                    res.json(result);
                                }
                            })
                        });
                    }
                });
           
        });
 

    app.get('/api/users/:location/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                geocoder.geocode(req.params.location, function(err, data) {
                    if (err) {
                        res.json({
                            400: "Geocoder could not get the location, please check for syntax errors."
                        });
                    } else {
                        var coordinates = {
                            lat: data.results[0].geometry.location.lat,
                            lon: data.results[0].geometry.location.lng
                        };
                        selectProfiles.getUserByLocation(coordinates, function(result) {
                            errorCodes.responseCodeHandler(result, function(foundError, code) {
                                if (foundError) {
                                    res.json(code);
                                } else {
                                    res.json(result);
                                }
                            })
                        });
                    }
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });
    });

    app.get('/api/users/friends/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                selectProfiles.getFriends(req.params.username, function(result) {
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
    app.post('/users/friends', function(req, res) {
        sessions.getSession(req.body.username, req.body.session, function(result) {
            if (result) {
                selectProfiles.getFriends(req.body.username, function(result) {
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



}
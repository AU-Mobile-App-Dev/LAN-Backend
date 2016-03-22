/**
 * Created by Rob Nice on 2/17/2016.
 */
var CryptoJS = require("crypto-js");
var exports = module.exports = {};

exports.hashString = function(password){
    return CryptoJS.RIPEMD160(password);
}

exports.compareStrings = function(password, storedPassword){
    return CryptoJS.RIPEMD160(password) == storedPassword;
}

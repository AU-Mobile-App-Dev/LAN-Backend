angular.module('lanSocial', [])

.controller('regController', function($http, $scope, regUser, validate){
    $scope.regUser = function(){
        var userObject = {
            username: $scope.username,
            password: $scope.password,
        }
        validate.validateEmail($scope.email, function(result){
            if(result){
                  regUser.register(userObject);
            }
            else{
               //Tell user it's not valid
               $scope.feedback = "not valid";
            }
        })
       
    }
})



.service('validate', function(){
    this.validateEmail = function(email, callback){
        //check if it's a valid email
        //it's invalid, return false
        callback(false);
    }
})
/**
 * Created by Rob on 2/13/2016.
 */
angular.module('pitectionApp')

    .service('sessionService', function(){
        // Get saved data from sessionStorage
        this.getSession = function(){
            return this.key;
        }
        this.setSession = function(){
            this.key = sessionStorage.getItem('key');
        }
        this.setUser = function(username){
            this.username = username;
        }
        this.getUser = function(){
            return this.username;
        }
    })
    //Service to handle logins for users
    .service('login', function($http,$location,sessionService){
        this.verify = function($scope){
            $http({
                method: 'POST',
                url: 'http://localhost:5000/authenticate',
                data:{username:$scope.username, password:$scope.password}
            }).then(function successCallback(response) {
                console.log(response.data);
                if(response.data.status == "loggedIn"){
                    // Save data to sessionStorage
                    sessionStorage.setItem('key', response.data.session);
                    sessionService.setSession();
                    sessionService.setUser($scope.username);
                    $location.path('/login');
                }
                else if(response.data.status == "failed"){
                    //invalid credentials
                    $scope.invalidLogin = false;
                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    })

    .service('registerService', function($http){
        this.registerUser = function(obj){
            $http({
                method: 'POST',
                url: 'http://localhost:5000/register/' + obj.username +'/' + obj.password +'/' + obj.email +'/fjdfajlkljk34r23rkjfsg024rwljs'
            }).then(function successCallback(response) {
                console.log(response.data);
                if(response.data.status == "success"){
                    $location.path('/');
                }
                else if(response.data.status == "failed"){

                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    })
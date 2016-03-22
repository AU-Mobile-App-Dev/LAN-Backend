angular.module('pitectionApp', ['ngRoute', 'ngResource'])


//Controllers
.controller('mainController',function($scope,sessionService){
   $scope.username =  sessionService.getUser();
})


.controller('loginController', function($scope,login){
    /**Add the username and password attributes to the scope object*/
    $scope.username = '';
    $scope.password = '';
    //ng-hide on span tag
    $scope.invalidLogin = true;
    /**ng-click directive function called, uses login service function*/
    $scope.userLogin = function(){
        login.verify($scope)

    }
})
    .controller('registerController', function($scope, registerService){
        $scope.regUser = function(){
            var userObject = {username: $scope.username,
            password: $scope.password,
            email: $scope.email};
            registerService.registerUser(userObject);
        }

    })

.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'loginController'
        })

        .when('/login', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController'
        }
        );
});


angular.module('lanSocial', [])

.controller('regController', function($http, $scope){
    $scope.regUser = function(){
        $http({
  method: 'POST',
  url: 'http://localhost:5000/register',
  data:{username: $scope.username, password:$scope.password, email:$scope.email, location:$scope.location}
}).then(function successCallback(response) {
    console.log(response.data);
  }, function errorCallback(response) {
     console.log(response.data);
  });
    }
})
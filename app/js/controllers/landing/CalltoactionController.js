(function(){

  'use strict';

  angular.module('startupBootstrap')

  .controller('CalltoactionController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';
    $scope.ShowBox = true;

    $scope.ToggleBox = function(){
      if($scope.ShowBox){
        $scope.ShowBox = !$scope.ShowBox;
      }else{
        if($scope.subscriber_email){
            EmailStoringService.main($scope.subscriber_email); // new not needed, dealing with jshint
        }
      }
    };
  }]);


})();

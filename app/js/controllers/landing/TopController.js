(function(){

  'use strict';

  angular.module('startupBootstrap')

  .controller('TopController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';

    $scope.SubmitEmail = function(){
      if($scope.subscriber_email){
          EmailStoringService.main($scope.subscriber_email); // new not needed, dealing with jshint
      }
    };
  }]);


})();

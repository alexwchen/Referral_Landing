(function(){

  'use strict';

  angular.module('startupBootstrap')

  .directive('featureNav', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/feature/nav.html',
      replace: true
    };
  })

  .directive('featureVideo', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/feature/video.html',
      replace: true
    };
  })

  .directive('featureBackground', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/feature/background.html',
      replace: true
    };
  })


  .directive('featureFeaturetable', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/feature/featuretable.html',
      replace: true
    };
  })

  .directive('featureStep', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/feature/step.html',
      replace: true
    };
  });

})();

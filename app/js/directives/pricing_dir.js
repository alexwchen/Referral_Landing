(function(){

  'use strict';

  angular.module('startupBootstrap')

  .directive('pricingPriceboard', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/priceboard.html',
      replace: true
    };
  })

  .directive('pricingBackground', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/background.html',
      replace: true
    };
  })

  .directive('pricingFaq', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/faq.html',
      replace: true
    };
  });

})();

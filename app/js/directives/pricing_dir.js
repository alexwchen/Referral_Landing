(function(){

  'use strict';

  angular.module('startupBootstrap')

  .directive('pricingNav', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/nav.html',
      replace: true
    };
  })


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

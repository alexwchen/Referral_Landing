(function(){

  'use strict';

  angular.module('startupBootstrap')

  .directive('landingNav', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/nav.html',
      replace: true,
      scope: {},
      controller:'NavController'
    };
  })

  .directive('landingBackground', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/background.html',
      replace: true
    };
  })

  .directive('landingTop', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/top.html',
      replace: true,
      scope: {},
      controller:'TopController'
    };
  })

  .directive('landingWhy', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/why.html',
      replace: true
    };
  })

  .directive('landingTestimonials', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/testimonials.html',
      replace: true
    };
  })

  .directive('landingPress', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/press.html',
      replace: true
    };
  })

  .directive('landingCalltoaction', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/calltoaction.html',
      replace: true,
      scope: {},
      controller:'CalltoactionController'
    };
  })

  .directive('landingFooter', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/footer.html',
      replace: true
    };
  })

  .directive('landingVideo', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/landing/video.html',
      replace: true
    };
  });

})();

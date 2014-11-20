(function(){
  'use strict';


  angular.module('startupBootstrap', ["ui.router", "firebase"])
  .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/app/partials/landing/skeleton.html'
    })
    .state('invite', { // invite is just like home but with referral id in url
        url: '/invite/:referralid',
        templateUrl: '/app/partials/landing/skeleton.html',
        controller: function($scope, $stateParams) {
            // disply referral id in referral link
            $scope.referralid = $stateParams.referralid;
        }
    })
    .state('referral', {
        url: '/referral/:referralid',
        templateUrl: '/app/partials/feature/skeleton.html',
        controller: 'stateReferralController'
    })
    .state('pricing', {
        url: '/pricing',
        templateUrl: '/app/partials/pricing/skeleton.html'
    });

  })

  .constant('FirebaseRoot', 'https://testlegendslanding.firebaseio.com/');
})();

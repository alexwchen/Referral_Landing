(function(){
  // come on
  'use strict';


  angular.module('startupBootstrap', ["ui.router", "firebase"])
  .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/app/partials/landing/skeleton.html'
    })
    .state('invite', {
        url: '/invite/:referralid',
        templateUrl: '/app/partials/landing/skeleton.html',
        controller: function($scope, $stateParams) {
            $scope.referralid = $stateParams.referralid;
        }
    })
    .state('referral', {
        url: '/referral/:referralid',
        templateUrl: '/app/partials/feature/skeleton.html',
        controller: function($scope, $stateParams, $firebase, FirebaseRoot) {
            $scope.referralid = $stateParams.referralid;
            // we create the new subscriber's email_obj
            var fireusers_root = new Firebase(FirebaseRoot).child('users');
            var fireusers = $firebase(fireusers_root).$asArray();

            fireusers.$loaded().then(function() {
              $scope.wait_order = fireusers.length;
            });

        }
    })
    .state('pricing', {
        url: '/pricing',
        templateUrl: '/app/partials/pricing/skeleton.html'
    });

  })

  .constant('FirebaseRoot', 'https://testlegendslanding.firebaseio.com/')

  .factory('EmailStoringService',['$state', '$location', '$firebase', 'FirebaseRoot', function($state, $location, $firebase, FirebaseRoot){
    return function(subscribed_email){

      // check if it is invited user
      // we increment refer count for the referer
      var url_path = $location.url();
      if (url_path.indexOf("invite")>-1){

        var split_str = url_path.split('/');
        var referer_id = split_str[split_str.length-1];

        var email_obj_root = new Firebase(FirebaseRoot).child('users').child(referer_id);
        var email_obj = $firebase(email_obj_root).$asObject();
        email_obj.$loaded().then(function() {
          email_obj.num_refers_made++;
          email_obj.$save().then(function(ref){
            console.log(ref.key() + ' saved!');
          });
        });
      }


      // we create the new subscriber's email_obj
      var fireusers_root = new Firebase(FirebaseRoot).child('users');
      var fireusers = $firebase(fireusers_root).$asArray();

      // save new email obj
      var new_email_obj = {};
      fireusers.$loaded().then(function() {
        new_email_obj.wait_order = fireusers.length;
        new_email_obj.email = subscribed_email;
        new_email_obj.num_refers_made = 0;
        new_email_obj.$priority = subscribed_email;
      }).then(function(){

        // set email priority, so later on I can query
        // fireusers.$priority = subscribed_email;

        fireusers.$add(new_email_obj).then(function(ref) {
           var id = ref.key();
           console.log("added record with id " + id);
           console.log($location);
           // pass firebase id, it will become referral link
           $state.go("referral",{referralid:id});
        });

      });

    };
  }])


  .controller('NavController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';
    $scope.ShowBox = true;

    $scope.ToggleBox = function(){
      if($scope.ShowBox){
        $scope.ShowBox = !$scope.ShowBox;
      }else{
        new EmailStoringService($scope.subscriber_email); // new not needed, dealing with jshint
      }
    };
  }])

  .controller('TopController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';

    $scope.SubmitEmail = function(){
      new EmailStoringService($scope.subscriber_email); // new not needed, dealing with jshint
    };
  }])

  .controller('CalltoactionController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';
    $scope.ShowBox = true;

    $scope.ToggleBox = function(){
      if($scope.ShowBox){
        $scope.ShowBox = !$scope.ShowBox;
      }else{
        new EmailStoringService($scope.subscriber_email); // new not needed, dealing with jshint
      }
    };
  }]);


})();

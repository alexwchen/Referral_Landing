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
            // disply referral id in referral link
            $scope.referralid = $stateParams.referralid;
        }
    })
    .state('referral', {
        url: '/referral/:referralid',
        templateUrl: '/app/partials/feature/skeleton.html',
        controller: function($scope, $stateParams, $firebase, FirebaseRoot) {
            $scope.referralid = $stateParams.referralid;
            var fireusers_root = new Firebase(FirebaseRoot).child('users').child($scope.referralid);
            var fireusers = $firebase(fireusers_root).$asObject();
            fireusers.$loaded().then(function(snap) { // search for subscriber obj
              $scope.wait_order = snap.wait_order+1;
              $scope.num_refers_made = snap.num_refers_made;
            });

            // all facebook material is in the function
            $scope.fbshare = function(){
              // var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?' + 'u=https://www.testlegends.com/?ref=' + $stateParams.referralid;
              var fburl = "http://www.facebook.com/sharer/sharer.php?";
              var site_config = "s=100&p%5Btitle%5D=Title&p%5Bsummary%5D=Test%20Summary.&p%5Burl%5D=http://www.testlegends.com/&p%5Bimages%5D%5B0%5D";
              var facebookShareUrl = fburl + site_config;
				      window.open(facebookShareUrl, 'popUpWindow','height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
            };
            // all twitter matiral is in this function
            $scope.twtshare = function(){
              var twitterShareUrl = 'https://twitter.com/share?' + "text=You don't need to be a developer to %23gamifyEducation anymore. Teachers can too! via %40TestLegendsApp" + '&' + 'url=https://www.testlegends.com/?ref=' + $stateParams.referralid;
				      window.open(twitterShareUrl, 'popUpWindow', 'height=480,width=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
            };

        }
    })
    .state('pricing', {
        url: '/pricing',
        templateUrl: '/app/partials/pricing/skeleton.html'
    });

  })

  .constant('FirebaseRoot', 'https://testlegendslanding.firebaseio.com/')

  .factory('EmailStoringService',['$state', '$location', '$firebase', 'FirebaseRoot', function($state, $location, $firebase, FirebaseRoot){

    // we increment referal count for the referer if any
    var update_num_of_users_referred = function(){
       var url_path = $location.url();
       if (url_path.indexOf("invite")>-1){ // check if it is an invited user

         var split_str = url_path.split('/');
         var referer_id = split_str[split_str.length-1]; // get referer id

         var email_obj_root = new Firebase(FirebaseRoot).child('users').child(referer_id); // update to firebase
         var email_obj = $firebase(email_obj_root).$asObject();
         email_obj.$loaded().then(function() {
           email_obj.num_refers_made++;
           email_obj.$save().then(function(ref){
             console.log(ref.key() + ' saved!');
           });
         });
       }
     };

     // check if email is already in database
     var check_repeated_subscriber = function(subscribed_email){
       // search in database
       return new Firebase(FirebaseRoot).child('users')
        .startAt(subscribed_email)
        .endAt(subscribed_email)
        .once('value', function(snap) {
          if(snap.val()){
            for(var key in snap.val()){ // get repeated subsriber id
              if(key.length===20){ // firebase database id is length of 20
                $state.go("referral",{referralid:key}); // go to referral page
              }
            }
          }else{
            create_new_subscriber(subscribed_email);
          }
        });
     };

     var create_new_subscriber = function(subscribed_email){
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

     var main = function(subscribed_email){

      update_num_of_users_referred();

      check_repeated_subscriber(subscribed_email);
    };

    return {
      main: main
    };
  }])


  .controller('NavController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
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
  }])

  .controller('TopController', ['$scope', 'EmailStoringService', function($scope, EmailStoringService){
    $scope.subscriber_email = '';

    $scope.SubmitEmail = function(){
      if($scope.subscriber_email){
          EmailStoringService.main($scope.subscriber_email); // new not needed, dealing with jshint
      }
    };
  }])

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

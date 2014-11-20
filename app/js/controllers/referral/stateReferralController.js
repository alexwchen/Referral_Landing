(function(){

  'use strict';

  angular.module('startupBootstrap')

  .controller('stateReferralController', ['$scope', '$stateParams', '$firebase', 'FirebaseRoot',
    function($scope, $stateParams, $firebase, FirebaseRoot){

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
  ]);


})();

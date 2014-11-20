(function(){

  'use strict';

  angular.module('startupBootstrap')

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
  }]);
})();

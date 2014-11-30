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
      replace: true,
      link:function(scope, elem, attrs){
        // Stripe Integration - form button cause deadly bug
        var create_stripe_button = function(name, image, description, amount, target_div_id){
          var form =  document.createElement("form");
          // form.action = "?";
          form.method = "POST";
          var script =  document.createElement("script");
          script.src = "https://checkout.stripe.com/checkout.js";
          script.className = "stripe-button";
          script.setAttribute("data-key", "pk_test_AGCWLc8KZWDi0bVBshw6Q8a3");
          script.setAttribute("data-image", image);
          script.setAttribute("data-name", name);
          script.setAttribute("data-description", description);
          script.setAttribute("data-amount", amount);
          form.appendChild(script);
          var buttonObj = angular.element(elem[0].querySelector(target_div_id));
          buttonObj.append(angular.element(form));
        };
        create_stripe_button("Personal", "app/assets/img/logo.png", "Personal ($5.00)", "500", "#payOne");
        create_stripe_button("Professional", "app/assets/img/logo.png", "Professional ($10.00)", "1000", "#payTwo");
        create_stripe_button("Business", "app/assets/img/logo.png", "Business ($20.00)", "2000", "#payThree");
      }
    };
  })

  .directive('pricingBackground', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/background.html',
      replace: true
    };
  })

  .directive('pricingTestimonials', function(){
    return {
      restrict: 'E',
      templateUrl: '/app/partials/pricing/testimonials.html',
      replace: true,
      link:function(scope, elem, attrs){
        var script =  document.createElement("script");
        script.src = "app/js/vendor_template/plugins/flexslider/jquery.flexslider-min.js";
        elem.append(angular.element(script));
      }
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

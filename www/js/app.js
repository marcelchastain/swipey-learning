// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('cards', {
      url: '/cards',
      templateUrl: 'cards.html'
    });
  $urlRouterProvider.otherwise('/');
})

.directive('noScroll', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope) {
  var cardTypes = [
    { image: 'http://placehold.it/500x500', title: 'So much grass #hippster'},
    { image: 'http://placehold.it/500x500', title: 'Way too much Sand, right?'},
    { image: 'http://placehold.it/500x500', title: 'Beautiful sky from wherever'}
  ];

  // controls whether we are showing the cards or not
  $scope.showCards = false;

  $scope.cards = [];

  $scope.addCard = function(i) {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };

  for (var i=0; i<3; i++) {
    $scope.addCard();
  }

  $scope.cardSwipedLeft = function(index) {
    console.log('Left swipe');
  };

  $scope.cardSwipedRight = function(index) {
    console.log('Right swipe');
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    console.log('Card removed');
  };
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

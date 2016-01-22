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
    .state('addCard', {
      url: '/add-cards',
      templateUrl: 'add-cards.html'
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
    { image: 'http://placehold.it/250x250',
      question: 'Who was the first president of the United States?',
      answer: 'George Washington'
    },
    { image: 'http://placehold.it/250x250',
      question: 'How many states are there in the United States?',
      answer: '50'
    },
    { image: 'http://placehold.it/250x250',
      question: 'What is Batman\'s real name?',
      answer: 'Bruce Wayne'
    }
  ];

  // controls whether we are showing the cards or not
  $scope.showCards = false;
  $scope.newCardData = {};

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

  $scope.addQuestion = function(question, answer) {
    // if the user failed to provide question or answer, display a browser alert message
    if (!question || !answer) {
      window.alert('Question and Answer must be provided.');
    }

    // create a data structure similar to the existing cards/questions
    var newQuestion = {
      image: 'http://placehold.it/250x250',
      question: question,
      answer: answer
    };

    // add it to the existing list of questions
    $scope.cards.push(newQuestion);

    // clear out the form inputs so they can add the next question
    $scope.newCardData.question = '';
    $scope.newCardData.answer = '';
  }

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

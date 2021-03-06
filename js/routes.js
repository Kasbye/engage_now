angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('signup', {
    url: '/page1',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('intro', {
    url: '/page2',
    templateUrl: 'templates/intro.html',
    controller: 'introCtrl'
  })

  .state('survey', {
    url: '/page3',
    templateUrl: 'templates/survey.html',
    controller: 'surveyCtrl'
  })

  .state('menu.dashboard', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('menu.myProfile', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('menu.recommendations', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recommendations.html',
        controller: 'recommendationsCtrl'
      }
    }
  })

  .state('menu.myEvents', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myEvents.html',
        controller: 'myEventsCtrl'
      }
    }
  })

  .state('menu.leaderboard', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/leaderboard.html',
        controller: 'leaderboardCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1')


});
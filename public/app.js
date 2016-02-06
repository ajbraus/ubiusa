/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ui.router',
                         'ngResource',
                         'myApp.services',
                         'myApp.interceptors',
                         'myApp.controllers'])
  
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('new-entrant', {
        url: "/",
        templateUrl: 'templates/entrants-new',
        controller: 'NewEntrantCtrl'        
      })

      .state('entrants', {
        url: "/admin",
        templateUrl: 'templates/posts-index',
        controller: 'EntrantsIndexCtrl'
      })

      .state('confirm-email', {
        url: "/confirm?token",
        templateUrl: 'templates/confirm-email',
        controller: 'ConfirmEmailCtrl'
      });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  });

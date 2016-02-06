/*
 * SERVICES
 */


'use strict';

var app = angular.module('myApp.services', []);

app.factory('Entrant', function ($resource, $window) {
  return $resource($window.location.origin + '/api/entrants/:id', {id:'@id'});
})
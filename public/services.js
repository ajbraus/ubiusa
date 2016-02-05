/*
 * SERVICES
 */


'use strict';

var app = angular.module('myApp.services', []);

app.factory('Entrant', function ($resource) {
  var url = "https://api.parse.com/1";
  return $resource(url + '/classes/Entrant/:id', {id:'@id'}, {
    query: { isArray: false }
  });
})
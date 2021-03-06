/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
 angular
   .module('tunely', ["ngRoute"])
   .config(config)
 function config ($routeProvider, $locationProvider) {
   $routeProvider
     .when('/', {
       templateUrl: 'templates/albums',
       controllerAs: 'albumsIndexCtrl',
       controller: 'AlbumsIndexController'
     })
     .when('/:id', {
       templateUrl: 'templates/albums-show',
       controllerAs: 'albumsShowCtrl',
       controller: 'AlbumsShowController'
     });

   $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
   });
 }

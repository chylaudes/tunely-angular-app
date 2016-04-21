angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);
AlbumsShowController.$inject = ['$http', '$routeParams'];
//we need to grab the _id of that data object that we're interested in from the url.
//Angular provides us with a module called $routeParams (very similar to Express's req.params)
//that allows us access the url path.
function AlbumsShowController (  $http,   $routeParams  ) {
  var vm = this;
  vm.album = {};
  vm.newSong = {};
  fetchAlbum();
  fetchSongs();

//fetching the Album
  function fetchAlbum() {
    $http({
      method: 'GET',
      url: '/api/albums/'+$routeParams.id
    }).then(function successCallback(json) {
      vm.album = json.data;


    });
  }

//fetching the songs
  function fetchSongs() {
    $http({
      method: 'GET',
      url: '/api/albums/'+$routeParams.id+'/songs'
    }).then(function successCallback(json) {
      vm.album.songs = json.data
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    })
  }

//Creating a Song!
  vm.createSong = function(album){
    $http({
      method: 'POST',
      url: '/api/albums/'+$routeParams.id+'/songs',
      data: vm.newSong
    }).then(function successCallback(response) {
      vm.album.songs.push(response.data);
      // how do we add the response data to our albums array?
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.deleteSong = function(album, song){
    $http({
      method: 'DELETE',
      url:'/api/albums/'+ $routeParams.id+'/songs/'+ song._id,
    }).then(function successCallback(json) {
      var index = vm.album.songs.indexOf(album);
      vm.album.songs.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });

  }

  vm.editSong = function(album, song){
    $http({
      method: 'PUT',
      url:'/api/albums/'+ $routeParams.id+'/songs/'+ song._id,
      data: song
    }).then(function successCallback(json) {
      //DON'T NEED TO DO ANYTHING FOR PUT
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}

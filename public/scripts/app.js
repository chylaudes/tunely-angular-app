/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
 angular
   .module('tunely', ["ngRoute"])
   .controller('AlbumsIndexController', AlbumsIndexController);


AlbumsIndexController.$inject = ['$http'];
// tells the controller that we'd like to have access to the $http module. The second line passes $http into the controller function
function AlbumsIndexController ($http) {
 var vm = this;
 vm.newAlbum = {};

 // vm.newAlbum = {
 //     name: 'License to Ill',
 //     artistName: 'Beastie Boys'
 // };

 //Route to get all the albums
 $http({
  method: 'GET',
  url: "/api/albums"
}).then(function successCallback(response) {
  vm.albums = response.data;
}, function errorCallback(response) {
  console.log('There was an error getting the data', response);
});

//Route to POST to albums API
vm.createAlbum = function () {
  $http({
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum
  }).then(function successCallback(response) {
    vm.albums.push(response.data);
    // how do we add the response data to our albums array?
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });
}

vm.deleteAlbum = function(album){
  $http({
    method: 'DELETE',
    url:'/api/albums/'+ album._id
  }).then(function successCallback(json) {
    var index = vm.albums.indexOf(album);
    vm.albums.splice(index, 1);
  }, function errorCallback(response) {
    console.log('There was an error deleting the data', response);
  });

}

vm.editAlbum = function(album){
  $http({
    method: 'PUT',
    url:'/api/albums/'+ album._id
  }).then(function successCallback(json) {
    //DON'T NEED TO DO ANYTHING FOR PUT
  }, function errorCallback(response) {
    console.log('There was an error deleting the data', response);
  });

}

//  vm.albums = [
//   {
//     name: 'Coming Home',
//     artistName: 'Leon Bridges'
//   },
//   {
//     name: 'Are We There',
//     artistName: 'Sharon Van Etten'
//   },
//   {
//     name: 'The Queen is Dead',
//     artistName: 'The Smiths'
//   }
// ];
console.log(vm);

}

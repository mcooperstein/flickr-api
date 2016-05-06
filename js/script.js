var app = angular.module('myApp', ['ngAnimate']);

app.controller('myCtrl', function ($scope, $http, $q, $timeout) {
    $scope.isSearching = false;
    $scope.resultsFound = false;
    $scope.noResults = false;

    $scope.results = [];

    $scope.search = function () {
        $scope.isSearching = true;
        $scope.resultsFound = false;
        $scope.noResults = false;

        var url = "https://api.flickr.com/services/rest";
        var request = {
            //this method does not require authentication
            method: 'flickr.photos.search',
            api_key: 'e6074e30cc2eaa441caf577ef10dc533',
            text: $scope.searchTerm,
            per_page: 21,
            safe_search: 1,
            //sort: 'date-posted-desc',
            sort: 'relevance',
            format: 'json',
            nojsoncallback: 1
        };

        $http({
                method: 'GET',
                url: url,
                params: request
            })
            .success(function (data) {
                $scope.isSearching = false;
                $scope.resultsFound = true;
                $scope.noResults = false;
                $scope.results = data;
                //console.log($scope.results);
                console.log($scope.results.photos.photo);
                //$scope.numImages = $scope.results.length;
                $scope.numImages = $scope.results.photos.photo.length;
                if ($scope.numImages === 0) {
                    $scope.isSearching = false;
                    $scope.resultsFound = false;
                    $scope.noResults = true;
                }
            }).error(function (error) {
                alert('There was an error with your search');
            });
    };
});

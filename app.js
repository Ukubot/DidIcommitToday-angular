var app = angular.module('rss', []);

app.controller('GithubController', function($scope, $http) {
  $scope.limit = 5;
  $scope.username = 'Ukubot';
  $scope.repos = null;

  $scope.getUser = function() {
    $scope.userNotFound = false;
    $scope.loaded = false;

    $http.get("https://api.github.com/users/" + $scope.username)
      .success(function(data) {
        if (data.name == "") data.name = data.login;
        $scope.user = data;
        $scope.loaded = true;
      })
      .error(function() {
        $scope.userNotFound = true;
      });
  };

  $scope.getRepos = function() {
    $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function(data) {
      $scope.repos = data;
      $scope.reposFound = data.length > 0;
    });
  };

    $scope.getCommits = function(repo) {
      $http.get("https://api.github.com/repositories/" + repo.id + "/commits").success(function(data) {
        repo.commits = data;
        repo.showcommits = true;
      })
    }

  $scope.getRepos();
});

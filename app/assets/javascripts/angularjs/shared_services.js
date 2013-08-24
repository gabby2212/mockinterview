app

.factory('UserDataService', [ '$cookies', function ($cookies) { 
  var d = JSON.parse($cookies.userData);
  
  d.isCurrentUser = function(email){
    return (d.email == email);
  }

  return d;
}])
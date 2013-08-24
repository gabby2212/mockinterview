app
.factory('Data', [ '$resource', function ($resource) { 
	return $resource('/signup_validation.json'); 
}])
.factory('DeviseSignin', [ '$resource', function ($resource) { 
	return $resource('/users/sign_in.json'); 
}])
.factory('DevisePassword', [ '$resource', function ($resource) { 
	return $resource('/users/password.json'); 
}])
.factory('DeviseSignup', [ '$resource', function ($resource) { 
	return $resource('/users.json'); 
}])

.controller("SigninCtrl", [ "$scope", "$cookies", "$location", "DeviseSignin", 
	function ($scope, $cookies, $location, DeviseSignin){

	$scope.incorrectForm = false;
	$scope.user = {};
	$scope.signin = {};

	$scope.authenticate = function(){
		var item = $scope.user;
		var response = DeviseSignin.save(item, function(data){	
			console.log(data);
			$scope.incorrectForm = false;
			$cookies.userData = JSON.stringify(data);
			document.location.href = '/';
		}, function(){
			$scope.incorrectForm = true;
			$scope.signin.message = "Invalid username or password!!";
		});
	}

}])


function ForgotPasswordCtrl($scope, DevisePassword){

	$scope.user = {};
	$scope.zippy = false;

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.user);
	}

	$scope.toggleZippy = function() {
		$scope.zippy = !$scope.zippy;
	}	

	$scope.validEmail = function(email){
    // email pattern matching
    if (email.match(pattern) == null)
    	$scope.invalidEmail = true;
    else
    	$scope.invalidEmail = false;
  }

  $scope.sendEmail = function(){
  	var item = $scope.user;
  	$scope.emailSent = true;
  	var response = DevisePassword.save(item, function(data){

  	}, function(){

  	});
  }
}
ForgotPasswordCtrl.$inject = ['$scope', 'DevisePassword'];

function SignupCtrl($scope, $timeout, $cookies, Data, DeviseSignup) {

	// initialise values using injection.
	$scope.database = {usernameTaken:false, shortUsername:false, goodUsername:false, 
		emailTaken:false, invalidEmail:false, goodEmail:false,
		shortPassword:true, mismatchPassword:true, allGood:false};
		Data.query({username:'@username',email:'@email'});
		var prom1, prom2;

		$scope.isClean = function() {
			return angular.equals(self.original, $scope.user);
		}

	// returns true if the form is invalid:
	// if any of the input fields are undefined (not touched) its an in valid form
	// if any of the fields are invalid, the whole form is invalid.
	$scope.invalidForm = function() {
		if ($scope.user.password === undefined || $scope.user.email === undefined || $scope.user.username === undefined)
			return true;
		var db = $scope.database;
		return !db.goodUsername || !db.goodEmail || db.shortPassword || db.mismatchPassword;
	}

	$scope.validUsername = function(length){
		$timeout.cancel(prom1); 
		var db = $scope.database;
    // username length validation
    if (length < 4){
    	db.usernameTaken = false;
    	db.shortUsername = true;
    	db.goodEmail = false;
    }
		// username existence
		else{
			db.shortUsername = false;
			prom1 = $timeout($scope.accessUsernameServer, 500);
		}
	}

	$scope.validEmail = function(email){
		$timeout.cancel(prom2);
		var db = $scope.database;
    // email pattern matching
    if (email === undefined || email.match(emailPattern) == null) {
    	db.emailTaken = false;
    	db.invalidEmail = true;
    	db.goodEmail = false;
    }
		// email existence
		else{
			db.invalidEmail = false;
			prom2 = $timeout($scope.accessEmailServer, 500);
		}
	}

	$scope.accessUsernameServer = function() {
		var db = $scope.database;{}
		var response = Data.get({username:$scope.user.username}, function()
		{
			if (response.username) {
				db.usernameTaken = true;
				db.goodUsername = false;
			}
			else {
				db.usernameTaken = false;
				db.goodUsername = true;
			}
		});
	}

	$scope.accessEmailServer = function() {
		var db = $scope.database;
		var response = Data.get({email:$scope.user.email}, function()
		{
			if (response.email) {
				db.emailTaken = true;
				db.goodEmail = false;
			}
			else {
				db.emailTaken = false;
				db.goodEmail = true;
			}
		});
	}

	$scope.validLength = function(length, valid_length) {
		if (length < valid_length) {
			$scope.database.shortPassword = true;
			return true;
		}
		else {
			$scope.database.shortPassword = false;
			return false;
		}
	}

	$scope.passwordMatch = function(password, password_confirmation){
		if (password != password_confirmation) {
			$scope.database.mismatchPassword = true;
			return true;
		}
		else {
			$scope.database.mismatchPassword = false;
			return false;
		}
	}

	$scope.send = function(){
		var item = $scope.user;
		var response = DeviseSignup.save(item, function(data){
			$cookies.userData = JSON.stringify(data);
			document.location.href = '/#/welcome';
			document.location.reload();
		}, function(){
			//$scope.incorrectForm = true;
			//$scope.signin.message = "Invalid username or password!!";
		});
	}

}
SignupCtrl.$inject = ['$scope', '$timeout', '$cookies', 'Data', 'DeviseSignup'];



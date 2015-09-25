//Define an angular module for our app
//alert("Hello");
var myApp = angular.module("myApp", [ 'ngRoute','ngCookies','ngTouch', 'ui.grid']);



myApp.controller("addUserController", function($scope, $http, $location,$rootScope) {
	console.log("Outside");
	
	$scope.msg = true;
	$scope.addUser = function(model) {
		console.log(model.userEmail);
		console.log("Inside");
		$http.post("ajax/addUser.php", model).success(function(data) {
			console.log("data::" + data);
		//	$scope.taskInput = "";
			$location.path("/");
		});
	};
	
	$scope.init = function(model){
		if( $rootScope.Login == 'no'){
			$scope.model ={
					userName : '',
					userEmail : '',
					passWord : ''
				} 
		}	
		
		$http.post("ajax/editUser.php", {username :$rootScope.userName}).success(function(data) {
			console.log(data);
			$scope.model ={
					userName : data[0].userName,
					userEmail : data[0].userEmail,
					passWord : data[0].passWord
				} 
		});
		
	};
	$scope.saveUser = function(model){
		console.log(model);
		console.log("userEmail:"+model);
		$http.post("ajax/updateUser.php", model).success(function(data) {
			console.log("data::" + data);
		//	$scope.taskInput = "";
			$scope.msg = false;
			$scope.successMessage ="profile updated successfully.";
		});
	};
	$scope.showLogin = function(){
		$location.path("/");
	};
	
});



myApp.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function(){
    
        $scope.showModal = !$scope.showModal;
    };
  });


myApp.controller("headerController", function($scope, $http, $location,$rootScope,AuthenticationService) {
	$scope.Logout = function() {
		  AuthenticationService.ClearCredentials();
		  $location.path('/');
		};
		
	$scope.profile = function(){$location.path("/Profile");	};
		
	$scope.admin = function(){$location.path("/Admin");	};
			
	$scope.modal = function(){$location.path("/modal");};
});


myApp.controller("adminController", function($scope, $http, $location,$rootScope,$route,$timeout) {
	$scope.adminMsg = true;
	$scope.showadminModal = false;
	
	
	
	/*
	 $scope.myData = [{
	        "firstName": "Cox",
	            "lastName": "Carney",
	            "company": "Enormo",
	            "employed": true
	    }, {
	        "firstName": "Lorraine",
	            "lastName": "Wise",
	            "company": "Comveyer",
	            "employed": false
	    }, {
	        "firstName": "Nancy",
	            "lastName": "Waters",
	            "company": "Fuelton",
	            "employed": false
	    }];
	  
	 $scope.gridOptions = { 
		        data: 'myData',
		        enableCellSelection: true,
		        enableRowSelection: false,
		        enableCellEditOnFocus: true,
		        columnDefs: [{field: 'firstName', displayName: 'F Name', enableCellEdit: true}, 
		                     {field:'lastName', displayName:'L Name', enableCellEdit: true}]
		    };*/
	
	
	$scope.init = function(){
		$scope.editMode = false;
		$http.post("ajax/selectAllUsers.php").success(function(data) {
			console.log(data);
			  $scope.usersData = data;
		
		});
		/*
		$scope.groupObj = [{
			'id': 'ADM',
			'name':'Admin'
				
		},{
			'id': 'USER',
			'name':'User'
		}];
		
		 $scope.user.group = $scope.options[1];*/
		
		 $scope.data = {
				    availableOptions: [
				      {id: 'ADM', name: 'Admin'},
				      {id: 'USER', name: 'User'}
				    ]};
	/*	 $scope.user.group = '2'; */
		/* $scope.user.group =  $scope.options[1] ;//This sets the default value of the select in the ui
*/		
	};
	
	/*  $scope.GetValue = function (fruit) {
          var fruitId = $scope.ddlFruits;
          var fruitName = $.grep($scope.data.availableOptions, function (fruit) {
              return fruit.Id == fruitId;
          })[0].Name;
          $window.alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);
      }*/
	
	 $scope.changeValue = function(ddObj,id) {
		/* var fruitId = $scope.dd;
         var fruitName = $.grep($scope.data.availableOptions, function (fruit) {
             return fruit.Id == fruitId;
         })[0].Name;
        alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);*/
		 
		 console.log(ddObj);
		 console.log(id);
		 
		 console.log($scope.usersData);
		 angular.forEach($scope.usersData, function(value, key) {
			if(value.uid == id){
				value.group =  ddObj.id;
			}
		});
		 
		 console.log($scope.usersData);
	};
	
	$scope.editAppKey = function(UID) {
           console.log($scope.usersData);
           var userObj = _.filter($scope.usersData, function(num){ return num.uid == UID; }); 
	       var UObj = {};
	       UObj.userName = userObj[0].uname;
	       UObj.userEmail = userObj[0].email;
	       UObj.Group = userObj[0].group;
	       console.log("object ::");
   	       console.log(UObj);
	       $http.post("ajax/updateInline.php", UObj).success(function(data) {
				console.log("data::" + data);
			    $scope.showadminModal = false;
				$scope.adminMsg = false;
				$scope.AdmsuccessMessage ="User Information saved successfully.";
				$scope.init();
				$timeout(function(){ $scope.callAtTimeout(); },3000);
		   });
  };
	
   $scope.addUserByAdmin = function() {
		  $scope.showadminModal = !$scope.showadminModal;
		  $scope.modal_title = "Add user";
		  $scope.addUser = 'yes';
		  $scope.model= {
				  group : 'USER' 
		  };
		
	};
	
	$scope.addUserbyAdminbtn = function(model){
		console.log(model.userEmail);
		console.log("Inside");
		$http.post("ajax/addUser.php", model).success(function(data) {
			console.log("data::" + data);
			  $scope.showadminModal = false;
				$scope.adminMsg = false;
				$scope.AdmsuccessMessage ="User Information saved successfully.";
				$scope.init();
				$timeout(function(){ $scope.callAtTimeout(); },3000);
		});
	};
	
	$scope.editUser = function(user_Email){
	        $scope.showadminModal = !$scope.showadminModal;
	        $scope.modal_title = "Edit user";
	        $scope.addUser = 'no';
	        $http.post("ajax/editUser.php",{username :user_Email}).success(function(data) {
				console.log(data);
				$scope.model ={
						userName : data[0].userName,
						passWord : data[0].passWord,
						userEmail : data[0].userEmail,
						group : data[0].group
					} 
			});
	};
	
	$scope.updateUser = function(model){
		$http.post("ajax/updateUser.php", model).success(function(data) {
			console.log("data::" + data);
		    $scope.showadminModal = false;
			$scope.adminMsg = false;
			$scope.AdmsuccessMessage ="User Information saved successfully.";
			$scope.init();
			$timeout(function(){ $scope.callAtTimeout(); },3000);
		});
	};
	
	
	
	$scope.deleteUser = function(uid){
	 var r = confirm("Are you sure you want to delete user?");
	    if (r == true) {
	    	$http.post("ajax/deleteUser.php",uid).success(function(data) {
				console.log(data);
				/*$route.reload();*/
				$scope.init();
				$scope.adminMsg = false;
				$scope.AdmsuccessMessage = "user deleted successfully.";
				$timeout(function(){ $scope.callAtTimeout(); },2000);
			});
	    }
	};
	
    $scope.callAtTimeout = function() {
		 $scope.adminMsg = true;
	   }
	
});



myApp.controller("loginController",function($scope,$http,$rootScope, $location, AuthenticationService) {
    $scope.signupForm = function() {
    	console.log("in");
    	$location.path("/register");
	 };
	 

     $scope.Login =  function (model) {
      
    	 console.log(model.username + " " + model.password);
         AuthenticationService.Login(model.username, model.password, function (response) {
             if (response.success) {
                 AuthenticationService.SetCredentials(model.username, model.password);
                 $http.post("ajax/editUser.php",{username : $rootScope.globals.currentUser.username}).success(function(data) {
         			 console.log(data);
         			 $rootScope.LoggedUsername = data[0].userName;
         			 $rootScope.LoggedEmail = data[0].userEmail;
         			 $rootScope.LoggedGroup = data[0].group;
         		});
                 $location.path('/Dashboard');
             } else {
               //  FlashService.Error(response.message);
              //   vm.dataLoading = false;
             }
         });
     };
	
});


myApp.run([ '$rootScope', '$location', '$cookieStore', '$http' ,function($rootScope, $location, $cookieStore, $http) {
	            
	/*var postLogInRoute;*/
	
	
	
	 // keep user logged in after page refresh
   $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        
        
        console.log("global data ::");
        
        console.log($rootScope.globals.currentUser);
        
        console.log($rootScope.globals.currentUser.username);
        
        $http.post("ajax/editUser.php",{username : $rootScope.globals.currentUser.username}).success(function(data) {
			console.log(data);
			
			 $rootScope.LoggedUsername = data[0].userName;
			 $rootScope.LoggedEmail = data[0].userEmail;
			 $rootScope.LoggedGroup = data[0].group;
			
			
		});
        
       
        
    }   
   
   //And call the method on the newScope.
    
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/','', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage  && !loggedIn) {
            $location.path('/');
        }
        
        if(loggedIn){
        	 $rootScope.Login = 'yes';
        	 $rootScope.userName = $rootScope.globals.currentUser.username;
        }else{
        	 $rootScope.Login = 'no';
        	 
        	 var  path =   next.split('#');
        	 
        	 console.log(path[1]);
        	 
        	 if(path[1] == undefined || path[1] == null || !loggedIn){
        	 
        		 $location.path('/').replace();
        	 }else{
        		 $location.path(path[1]).replace();
        	 }
        }
        console.log("location change");
        console.log(event);
        console.log(next);
        console.log(current);
     
    	
	    
	    
        if(!restrictedPage && loggedIn){
        	/*var lastPath = window.history.back();
        	  $location.path(lastPath).replace();
        	*/  
        	   var  path =   current.split('#');
        	   console.log(path[1]);
        	     console.log(path);
        	  $location.path(path[1]).replace();
        	 /* window.history.back();*/
             
        }
         
     /*   if(!restrictedPage && !loggedIn){
        	 $location.path('/');
        }*/
   
    });
    
				
	} ]);


myApp.config([ '$routeProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/Dashboard', {
		templateUrl : 'view/dashboard.html',
		controller : 'DashboardController'
	}).when('/AddNewOrder', {
		templateUrl : 'view/add_order.html',
		controller : 'AddOrderController'
	}).when('/ShowOrders', {
		templateUrl : 'view/show_orders.html',
		controller : 'ShowOrdersController'
	}).when('/register', {
		templateUrl : 'view/form.html',
		controller : 'FormController'
	}).when('/',{
		templateUrl :'view/login.html',
		  controller: 'loginController'
	}).when('/Admin',{
		templateUrl :'view/adminPage.html',
		  controller: 'adminController'
	}).when('',{
		templateUrl :'view/login.html',
		  controller: 'loginController'
	}).when('/modal',{
		templateUrl :'view/modal.html',
		  controller: 'MainCtrl'
	}).when('/Profile',{
		templateUrl :'view/form.html',
		  controller: 'FormController'
	});
} ]);


myApp.controller('FormController',function($scope){
	$scope.message = 'This is Form screen';
	$scope.pageClass = 'active';
	console.log("Active Form");
});
myApp.controller('AddOrderController', function($scope) {

	$scope.message = 'This is Add new order screen';
	$scope.pageClass = 'active';

});
myApp.controller('DashboardController', function($scope,$http, $location, AuthenticationService) {

	$scope.message = 'This is Dashboard orders screen';
	$scope.pageClass = 'active';
	
	
	
	console.log("Active Dashboard");

});
myApp.controller('ShowOrdersController', function($scope) {

	$scope.message = 'This is Show orders screen';

});
(function () {
    'use strict';
  angular
        .module('myApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];



/*myApp.factory(['$http',*/function UserService($http){
	
	   var service = {};

      
     
       service.GetByUsername = GetByUsername;
      
       return service;
       
       
       function GetByUsername(username) {
    	   
    	   var parameter = JSON.stringify({userName:username});
    	   
    		/*alert("in user - username:-"+username  );*/
           return $http.post("ajax/login.php", {'userName':username}).then(function(response){
        	   
        	   console.log(response);
        	   return response;
           });
    	  
       }

       function handleSuccess(data) {
           return data;
       }
       
	
}  })(); /*]);*/

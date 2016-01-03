

var myApp = angular.module('myApp', []);

myApp.controller('WeatherCtrl', ['$scope', '$q', '$http', '$interval', function($scope, $q, $http, $interval) {   
	var self = this;
	$scope.cities = [
		{id: 802, name: 'San Francisco'},				
	];
	$scope.selectedCity = $scope.cities[0];

	$scope.$watch('selectedCity', function(newValue, oldValue){
		self.getWeatherForSelectedCity();
	})

	$scope.data = [];

	$scope.weatherForSelectedCity = null;

	$scope.loading = true;

	self.getWeatherForSelectedCity = function() {
		if(!$scope.loading) {
			angular.forEach($scope.data, function(item){
				if(item.cityName === $scope.selectedCity.name) {
					$scope.weatherForSelectedCity = item;
				}
			})		 	
		}		
	}

	// $interval(function () {

	// }, 3000000);	

	// var getWeatherByCity = function(cityName) {
	// 	var defer = $q.defer();
				

	// 	var basedUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?';
	// 	basedUrl += 'q=' + cityName;
	// 	basedUrl += '&mode=json&units=metric&cnt=7'
	// 	$http.get(basedUrl)
	// 		.success(function(result){
	// 			// $scope.data.items = [];
	// 			// $scope.data.city = result.city.name;
	// 			// angular.forEach(result.list, function(item) {
	// 			// 	$scope.data.items.push(item);
	// 			// })
	// 			defer.resolve(result);		
	// 		})
	// 		.error(function(error){
	// 			defer.reject(error);
	// 		})

	// 	return defer;
	// }

	self.getWeather = function() {
		$scope.loading=true;
		var promises = $scope.cities.map(function (city){
			var basedUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?';
			basedUrl += 'q=' + city.name;
			basedUrl += '&mode=json&units=metric&cnt=1'
			return $http.get(basedUrl);
			// 	.success(function(result){
			// 		// $scope.data.items = [];
			// 		// $scope.data.city = result.city.name;
			// 		// angular.forEach(result.list, function(item) {
			// 		// 	$scope.data.items.push(item);
			// 		// })
			// 		defer.resolve(result);		
			// 	})
			// 	.error(function(error){
			// 		defer.reject(error);
			// 	});
		}) 		

		$q.all(promises).then(function(value){
		
			$scope.data = [];
			angular.forEach(value, function(i){ 
				var item = {};				
				item.cityName = i.data.city.name;
				var weatherDays = [];
				 angular.forEach(i.data.list, function (obj){
				 	weatherDays.push({temp: obj.temp.day, humidity: obj.humidity});	
				 })

				 item.weatherDays = weatherDays;
				 $scope.data.push(item);					 	 									 
			})
			$scope.loading = false;
			self.getWeatherForSelectedCity();					
			
		}, function(error) {
			$scope.loading = false;
			console.log(error);	
		})
	}
	$interval(self.getWeather(), 1000);
	
	
}]);


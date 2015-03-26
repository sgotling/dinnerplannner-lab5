// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

	// var a = Dinner.DishSearch.get({title_kw:'chicken'});
	// console.log(a);
	// Dinner.Dish.get({id:12345})
	 // $scope.selectedDish = 0;

	$scope.search = function(query) {
   		$scope.status = "Searching...";
   		Dinner.DishSearch.get({title_kw:query},function(data){
     		$scope.dishes=data.Results;
     		$scope.status = "Showing " + data.Results.length + " results";
   		},function(data){
     		$scope.status = "There was an error";
   });
 }

 $scope.setSelectedDishID = function (ID) {
   Dinner.setSelectedDishID(ID);
    console.log("selectedDishID " + Dinner.selectedDishID)
 }

 $scope.selectedDishID = Dinner.selectedDish;


  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

});
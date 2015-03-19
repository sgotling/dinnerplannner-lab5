// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  // console.log($routingParams.ngResource);
  var dishID = 791654;
  $scope.dishID = dishID;
  $scope.dish = Dinner.Dish.get({id:dishID});

  $scope.addDishToMenu = function () {
  	Dinner.addDishToMenu($scope.dish);
  }

});
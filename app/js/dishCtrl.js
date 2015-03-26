// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  // console.log($routingParams.ngResource);
  var dishID = Dinner.selectedDishID;
  $scope.dishID = dishID;
  $scope.dish = Dinner.Dish.get({id:dishID});

  Dinner.setSelectedDish = $scope.dish;
  var currentId = $routeParams.id;
  console.log($routeParams.id);
  $scope.addDishToMenu = function () {
    console.log($scope.dish);
  	Dinner.addDishToMenu($scope.dish);
    console.log(Dinner.getFullMenu());
  }

});
dinnerPlannerApp.controller('PreparationCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();


  $scope.menu = function() {
  	return Dinner.getFullMenu();
  }




  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});
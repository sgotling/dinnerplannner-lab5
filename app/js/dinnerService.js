// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookieStore) {
  

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  //DinnerModel Object constructor

 
  //TODO Lab 2 implement the data structure that will hold number of guest
  // and selected dinner options for dinner menu
    var numberOfGuests = 1;
    var menu = [];
    
    this.menuCookieCache = [];
    this.notNumberOfGuestsCookie = 5;

    var _this = this;
    this.dishCash = {};
    this.selectedDishID = 0;
    this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'dvx6j4dEVCjgc02u8V5y928UJ4KjIO04'});
    this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvx6j4dEVCjgc02u8V5y928UJ4KjIO04'}); 


// 559510
// 591648
// 572571
// 167511

// $cookieStore.put('menuByID', [167511,57257,591648,559510]);

    this.addDishesToMenuFromCookie = function () {
      _this.menuCookieCache = $cookieStore.get('menuByID');
      for(var i in _this.menuCookieCache){
        var id = _this.menuCookieCache[i];
        var dish = _this.Dish.get({id:id});
        menu.push(dish);
        
      }
    }
    this.addDishesToMenuFromCookie();



    this.setSelectedDishID = function (dishId) {
      _this.selectedDishID = dishId;
    }


  this.setNumberOfGuests = function(num) {
    //TODO Lab 2
      numberOfGuests = num;
      $cookieStore.put('numberOfGuests', num);
      // $cookieStore.put('numberOfGuests', numberOfGuests);
  }

  // should return 
  this.getNumberOfGuests = function() {
    //TODO Lab 2
    numberOfGuests = $cookieStore.get('numberOfGuests');
      return numberOfGuests;
      


  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    //TODO Lab 2
      var index;
      if(type == "starter"){
    index = 0;
      }
      
      if(type == "main dish"){
    index = 1;
      }

      if(type == "dessert"){
    index = 2;
      } 
     
      return menu[index];
       
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    //TODO Lab 2
      return menu;
  }

  //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function() {
    //TODO Lab 2
  var dish;
  var dish_list = [];
  
  for(dish in menu){
    
      dish_list.push(menu[dish].Ingredients);
  }
  return dish_list;
  }


  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
      var ingredients = this.getAllIngredients();
      var dish;
      var ing;
      var totalPrice = 0;
      var i = 0;
      
      while(i < ingredients.length){
    for(ing in ingredients[i]){
      
        totalPrice += ingredients[i][ing].MetricQuantity;


    }
    i++;
      }
      totalPrice = totalPrice * numberOfGuests;
      return totalPrice;
  }

  this.getDishPrice = function (dish) {
    var price = 0;
    for(var ing in dish.Ingredients){

      price += dish.Ingredients[ing].MetricQuantity;
    }

    return price
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dish) {
    //TODO Lab 2
    // Category: "Appetizers"
//       var index = 0;
//       var type = _this.selectedDish.Category;
// while(index < menu.length){
//   if(type === menu[index].Category) {
//     menu.splice(index,1);
    
//   }
//   index = index + 1;
// }


      menu.push(dish);
      _this.menuCookieCache.push(dish.RecipeID);
      $cookieStore.put('menuByID', _this.menuCookieCache);
      // console.log("notMenuCookie ", _this.notMenuCookie);
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    //TODO Lab 2
      var index = 0;
      console.log("id from input", id)

       for(dish in menu){

      if(menu[dish].RecipeID === id) {
          menu.splice(index,1);
      }
     else{
         index += 1;
         } 
    }
    var dishIndex = _this.menuCookieCache.indexOf(id);
    _this.menuCookieCache.splice(dishIndex, 1);
    $cookieStore.put('menuByID', _this.menuCookieCache);
    var menuCookie = $cookieStore.get('menuByID');
    console.log('menuByID', menuCookie);
  }




  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
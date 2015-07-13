var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  }); //CONGRATULATIONS SAN FRANCISCO, YOU RUINED PIZZA!

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
          /* solve using filter() & all() / any() */
          var hasNuts = function(pizza) {
              return pizza.containsNuts;
          };

          var hasMush = function(pizza) {
              return _(pizza.ingredients).any(function(x) {
                  return x === "mushrooms";
              });
          };

          productsICanEat = products.filter(function(x) {
              return (!hasNuts(x) && !hasMush(x));
          });

          expect(productsICanEat.length).toBe(1);
      });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    
    /* try chaining range() and reduce() */

    sum = _.chain(_.range(1, 1000))
                    .filter(function(x) { return (x % 3 === 0 || x % 5 === 0) } )
                    .reduce(function(sum, x) { return sum + x } )
                    .value();


    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });




// This solution works, but does not use the Reduce function. I don't know if it's the answer you're looking for.  
  it("should count the ingredient occurrence (functional)", function () {
  var ingredientCount = { "{ingredient name}": 0 }; 
    
   ingredientCountArray =  _.chain(products)
                      .map(function (cv, i, products) {return products[i].ingredients;})
                      .flatten()
                      .map(function (cv, i) {
                        if(ingredientCount[cv] == undefined || ingredientCount[cv] == NaN) { ingredientCount[cv] = 1 } else { 
                          ingredientCount[cv] = ingredientCount[cv] + 1 } 
                        })
                     .value();
                                         
               
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  }); 
               
 
  it("should find the largest prime factor of a composite number", function () {
    
    var findPrimes = function(maxValue, primes, value) {
        if (primes === undefined || value === undefined) {
            var primes = [2];
            var value = 3;
        };
        if (value <= maxValue) {
            if (primes.some(function(el) {
                return value % el === 0
            })) {
                return findPrimes(maxValue, primes, value + 2);
            } else {
                primes.push(value);
                return findPrimes(maxValue, primes, value + 2);
            };
        };
        return primes;
    };

    var largestPrimeFactor = function(composite){
      var primesLower = findPrimes(composite - 1);
      primesLower.reverse();
      for(var i = 0; i < primesLower.length; i++){
        console.log(i);
          if(composite % primesLower[i] === 0){
            var output = primesLower.splice(i, 1)
                        i = primesLower.length + 1;
          } // end if
      }; // end for
      return output;
    };


  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });



});

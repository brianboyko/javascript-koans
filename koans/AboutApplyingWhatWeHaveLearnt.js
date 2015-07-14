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
                return findPrimes(maxValue, primes, value + 2); // because no even number can be prime.
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
          if(composite % primesLower[i] === 0){
            var output = primesLower[i];
                        i = primesLower.length + 1;
          } // end if
      }; // end for
      return output;
    };

  expect(largestPrimeFactor(600)).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var isPalindrome = function(test){
      strTest = test.toString();
      if(
        strTest.charAt(0) === strTest.charAt(strTest.length-1) &&
        strTest.charAt(1) === strTest.charAt(strTest.length-2) &&
        strTest.charAt(2) === strTest.charAt(strTest.length-3) ){
        return true;
      } else {
        return false;
      }; // This simple test works for all 5 digit and 6 digit numbers. I could impliment a more inclusive version using recrusion to test whether ANY string is a palindrome, but that's not part of the assignment. 
    };

    var largestPalindrome = function(){
    var king = 0;
    var challenger = 0;
    var i, j; //brute force okay with you? 
      for(i = 100; i < 1000; i++){
        for(j = 100; j < 1000; j++){
          challenger = i * j;
          if( isPalindrome(challenger) && challenger > king){king = challenger; console.log(i + " , " + j + "king: " + king)};
        }
      }
    return king;
    };

    expect(largestPalindrome()).toBe(906609); // 913 * 993)
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

        var isDivisible = function(test, mrArray){
          return mrArray.every(function(cv){return test % cv === 0});
        };

// This WILL work and return 232792560 --- in about 3 years. *sigh* - Okay, can't brute-force this. 
/*        
      var smallestDiv = function(){
        // all numbers are divisible by 1, all numbers divisible by 10 are also divisible by 20, 5, & 2, all numbers divisible by 12 are also disible by 6, 3... you get the picture.   
        var factors = _.range(11, 21)
        var startvalue = factors.reduce(function(a, b){return a*b;}); // 670442572800 - this is our upper bound
        var king = "error";
        

        for(var i = 670442572800 * 2; i > 0; i = i - 20){
          if(isDivisible(i, factors)) {console.log(king); king = i} // end if
          } // endfor loop
          
        return king;
      }; // end smallestDiv();
*/


 var smallestDiv = function(topOfRange) {

   var findPrimes = function(maxValue, primes, value) {
     if (primes === undefined || value === undefined) {
       var primes = [2];
       var value = 3;
     }
     if (value <= maxValue) {
       if (primes.some(function(el) {
         return value % el === 0;
       })) {
         return findPrimes(maxValue, primes, value + 2);
       } else {
         primes.push(value);
         return findPrimes(maxValue, primes, value + 2);
       }
     }
     return primes;
   }; // end findPrimes
   
   var maxExpo = Math.floor(Math.sqrt(topOfRange));
   var primeArray = findPrimes(topOfRange);
   console.log(primeArray); // should be [2, 3, 5, 7, 11, 13, 17, 19]

   var primeProds = primeArray.map(function(cv){
    var candidate;
      for(var i = 1; i <= maxExpo; i++){
        if(Math.pow(cv, i) <= topOfRange){
          candidate = Math.pow(cv, i);
        } else { i = maxExpo + 1; } // end if 
      }// end for
      return candidate;
    });// end map which finds primeProds - should be [16, 9, 5, 7, 11, 13, 17, 19]

   console.log(primeProds);
   
   var output = primeProds.reduce(function(product, cv) {
     return product = product * cv;
   }, 1);
   
   console.log(output);
   return output;
 };

    expect(smallestDiv(20)).toBe(232792560);
  });


  it("should find the difference between the sum of the squares and the square of the sums", function () {
// I am assuming you are looking for the sum of the square of a range of numbers, versus the square of the sum of a range of numbers, i.e, function (1, 4) should return (1+2+3+4)^2 - (1^2 + 2^2 + 3^2 + 4^2) 

  var sumOfSquares = function(low, high) { // low inclusive, high exclusive. 
    var initArray = _.range(low, high);
    console.log("sumOfSq-initArray: " + initArray);
    var squaredArray = initArray.map(function(cv) {
      return Math.pow(cv, 2);
    });
    console.log("sumOfSq-squaredArray: " + squaredArray);
    var output = squaredArray.reduce(function(output, cv) {
      return output = output + cv;
    });
    console.log("sumOfSq-output: " + output);
    return output;
  };

  var squareOfSum = function(low, high) { // low inclusive, high exclusive. 
    var initArray = _.range(low, high);
    console.log("sqOfSum-initArray: " + initArray);
    var summed = initArray.reduce(function(summed, cv) {
      return summed = summed + cv;
    });
    console.log("sqOfSum-summed: " + summed);
    console.log("sqOfSum-result: " + Math.pow(summed, 2));
    return Math.pow(summed, 2);
  };

  var diffHollywoodSquares = function(low, high) { // low inclusive, high exclusive. 
    return squareOfSum(low, high) - sumOfSquares(low, high) ;
  };

    expect(diffHollywoodSquares(1, 10)).toBe(1740); 
  });

/*

  it("should find the 10001st prime", function () {

  });

*/

});

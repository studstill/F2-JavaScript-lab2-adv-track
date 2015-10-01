'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
its meteorite. At first, the blob could only find and consume
Pennsylvanians at a rate of 1/hour. However, each time it digested
someone, it became faster and stronger: adding to its consumption
rate by 1 person/hour.

for the...      | starting rate of | persons consumed |
              |  consumption     |    that hour     |
--------------------|------------------|------------------|
first hour      |    1/hour        |        1         |
second hour     |    2/hour        |        2         |
third hour      |    3/hour        |        3         |
fourth hour     |    4/hour        |        4         |

TODO: First, make a constructor function, called Blob, that makes blobs.

TODO: Next, create an instance of Blob named blob.

TODO: Then, use a loop to calculate how long it took the blob to finish
with Dowington.
*/
//Create a blob constructor function
function Blob(startingRate, personsConsumed) {
  this.peoplePerHour = startingRate;
  this.personsConsumed = personsConsumed;
}

//Create an instance of blob
var blob = new Blob(1, 0);

//Loop to calculate how long it took the blob to finish
var hoursSpentInDowington = 0;
while (blob.personsConsumed <= 1000) {
  blob.personsConsumed += blob.peoplePerHour;
  hoursSpentInDowington++;
  blob.peoplePerHour++;
  if (blob.personsConsumed >= 1000) {
    console.log('The blob has spent ' + hoursSpentInDowington + ' hours in Dowington and has consumed ' + blob.personsConsumed + ' people!');
    break;
  }
}

// TODO: assign me the value of the
                     // above calculation (how long it took
                     // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function hoursToOoze(population, peoplePerHour) {
// TODO: implement me based on the instructions above.
// Be sure to then assign me to the Blob's prototype.
  var hours = 0;
  while (population >= 1) {
    population -= peoplePerHour;
    hours++;
    peoplePerHour++;
  }
  return hours;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

//Create a MutantBlob() constructor function which inherits from Blob() to test assertion below.
function MutantBlob() {
  this.power = 'Laser Eyes';
}
MutantBlob.prototype = new Blob();
var blob2 = new MutantBlob(1, 0);

assert(blob2.hoursToOoze(1000, 1) === hoursSpentInDowington, 'The MutantBlob class inherits the hoursToOoze method and it should behave the same');
assert(blob.hoursToOoze(1, 1) === 1, 'With a population of 1 and at a rate of 1 per hour, the hours to ooze method should return 1');
assert(blob.hoursToOoze(1000, 1000) === 1, 'If the rate is a 1000 and the population is 1000, the fucntion should return 1');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
klingon: 'nuqneH',  // home planet is Qo'noS
romulan: 'Jolan\'tru', // home planet is Romulus
'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing(homePlanet, language) {
// TODO: specify a home planet and a language
// you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function sayHello(sb) {
// TODO: say hello prints out (console.log's) hello in the
// language of the speaker, but returns it in the language
// of the listener (the sb parameter above).
// use the 'hello' object at the beginning of this exercise
// to do the translating
  console.log(hello[this.language]);
  return hello[sb.language];

//TODO: put this on the SentientBeing prototype
};

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {
}
function Human() {
}
function Romulan() {
}

Klingon.prototype = new SentientBeing('Qo\'noS', 'klingon');
Human.prototype = new SentientBeing('Earth', 'federation standard');
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the human should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the human should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

var myStringArray = ['Pizzaz', 'Zapper', 'Zebra', 'Zoo'];

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
//TODO: implement me. sort the strings in alphabetical
// order using their last letter
// Read this about how the sort function works:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// this byLastLetter function is a "compare function"
// And check out the "comparing strings" section  here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    var lastLetterA = a.slice(-1);
    var lastLetterB = b.slice(-1);
    if (lastLetterA < lastLetterB) {
      return -1;
    }
    else if (lastLetterA > lastLetterB) {
      return 1;
    } else {
      return 0;
    }
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}

lastLetterSort(myStringArray);

assert(myStringArray[0] === 'Zebra', 'The first item in the array should be "Zebra"');
assert(myStringArray[myStringArray.length - 1] === 'Pizzaz', 'The last item in the array should be "Pizzaz"');

var myNumberArray = [1, 2, 3, 4];
var myNumberArray2 = [-1, -2, -3, -4];

function sumArray(numberArray) {
  var sum = 0;
// TODO: implement me using forEach
  numberArray.forEach(function(index) {
    sum += index;
  });
  return sum;
}

assert(sumArray(myNumberArray) === 10, 'The sum of the numbers in myNumberArray should equal 10');
assert(sumArray(myNumberArray2) === -10, 'The sum of the numbers in myNumberArray should equal -10');

var myArrayOfArrays = [[99, 5], [4, 1], [1, 2, 3, 4], [5, 2, 0, 1], [100, -99]];

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
// TODO: implement me using sumArray
//  order the arrays based on the sum of the numbers
//  inside each array
    var firstArraySum = sumArray(a);
    var secondArraySum = sumArray(b);
    if (firstArraySum < secondArraySum) {
      return -1;
    }
    else if (firstArraySum > secondArraySum) {
      return 1;
    } else {
      return 0;
    }
  });
  return arrayOfArrays;
}
sumSort(myArrayOfArrays);

//Array comparison function inspired by http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript

Array.prototype.isEqualTo = function isEqualTo(secondArray) {
  if (this.length !== secondArray.length) {
    return false;
  }
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
};

assert(sumSort(myArrayOfArrays)[0].isEqualTo([100, -99]), 'The first in the array of arrays should be [100, -99]');
assert(sumSort(myArrayOfArrays)[myArrayOfArrays.length - 1].isEqualTo([99, 5]), 'The last in the array of arrays should be [99, 5]');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

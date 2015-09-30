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
function Blob() {
  this.rateConsumption = 1;
}

var blob = new Blob();
var personsConsumed = 0;
var hour = 0;

while (personsConsumed < 1000) {
  hour++;
  personsConsumed += blob.rateConsumption;
  blob.rateConsumption++;
}

var hoursSpentInDowington = hour; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.

  var personsConsumed = 0;
  var hour = 0;
  blob.rateConsumption = peoplePerHour;
  while (personsConsumed < population) {
    hour++;
    personsConsumed += blob.rateConsumption;
    blob.rateConsumption++;
  }
  return hour;
}

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

assert(blob.hoursToOoze(15, 3) === 4, 'blob will eat 15 people');
assert(blob.hoursToOoze(30, 1) === 8, 'blob will eat 30 people');
assert(blob.hoursToOoze(100, 1) === 14, 'blob will eat 100 people');
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

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

function SentientBeing(planet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = planet;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello(sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating

  console.log(hello[this.language]);

  return (hello[sb.language]);
    //TODO: put this on the SentientBeing prototype
}
SentientBeing.prototype.sayHello = sayHello;

function Human() {}
function Klingon() {}
function Romulan() {}

Human.prototype = new SentientBeing('Earth', 'federation standard');
Klingon.prototype = new SentientBeing('Krios Prime', 'klingon');
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a 'compare function'
    // And check out the 'comparing strings' section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    var ret = 0;
    if (a.substr(a.length - 1, 1) < b.substr(b.length - 1, 1)) {
      ret = -1;
    }
    if (a.substr(a.length - 1, 1) > b.substr(b.length - 1, 1)) {
      ret = 1;
    }
    return ret;
  }
  stringArray.sort(byLastLetter);
  return stringArray;
}

var strArray = ['abc', 'x', 'ue', 'toy', 'dog'];
var strArray2 = ['i', 'er', 'giraffe'];

assert(lastLetterSort(strArray).toString() === ['abc', 'ue', 'dog', 'x', 'toy'].toString(), 'not ordered by last letter');

assert(lastLetterSort(strArray2).toString() === ['giraffe', 'i', 'er'].toString(), 'not ordered by last letter');

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(currentValue) {sum += currentValue;});
  return sum;
}

assert(sumArray([4, 5, 6, 7, 8, 10]) === 40, 'sum should be 40');
assert(sumArray([5, -5, 1, 0, -4, 3]) === 0, 'sum should be 0');

function compareNumbers(a, b) {
  return sumArray(a) - sumArray(b) ;
}
function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(compareNumbers);
  return arrayOfArrays;
}

var arr = [[3, 4, 5], [4, 6, 7, 7], [1, 2, 1], [0, 1]];
var arr2 = [[3, 4, 5], [99, 1], [1, 2, 1], [0, 1, -4]];

assert(sumSort(arr).toString() === [[0, 1], [1, 2, 1], [3, 4, 5], [4, 6, 7, 7]].toString(), 'bad order arr');
assert(sumSort(arr2).toString() === [[0, 1, -4], [1, 2, 1], [3, 4, 5], [99, 1]].toString(), 'bad order arr2');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

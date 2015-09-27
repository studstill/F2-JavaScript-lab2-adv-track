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

*/

// First, I made a constructor function, called Blob, that makes blobs.

function Blob(name) {
  this.name = name;
}

// Next, I created an instance of Blob named blob.

var blob = new Blob('blob');

//  I used a loop to calculate how long it took the blob to finish
//  with Dowington.

var people = 1000;
var rateOfConsumption = 1;
while (people > 0) {
  people = people - rateOfConsumption;
  if (hoursSpentInDowington) hoursSpentInDowington++;
  else hoursSpentInDowington = 1;
  rateOfConsumption++;
}

var hoursSpentInDowington = 45; // I assigned the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // I implemented this based on the instructions above.
  var numHours = 0;
  while (population > 0) {
    population -= peoplePerHour;
    numHours++;
    peoplePerHour++;
  }
  return numHours;
}

// I assigned hoursToOoze to the Blob's prototype.
Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// I wrote three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze('zombies', 100) === 0, 'zombies aren\'t edible');
assert(blob.hoursToOoze(500, 5) === 28, 'Should take 28 hours');
assert(blob.hoursToOoze(1, 1) === 1, '1 in 1 is a quick snack');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// I defined a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that I placed on the prototype) called
// sayHello.

function SentientBeing(homePlanet, language) {
  this.homePlanet = homePlanet;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello(sb) {
  console.log(hello[this.language]);
  return hello[sb.language];
}

SentientBeing.prototype.sayHello = sayHello;

// Created three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {}
Klingon.prototype = new SentientBeing('Qo\'nos', 'klingon');
function Human() {}
Human.prototype = new SentientBeing('Earth', 'federation standard');
function Romulan() {}
Romulan.prototype = new SentientBeing('Romulus', 'romulan');

// Human to Klingon
assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// Human to Romulan
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

// Romulan to Klingon
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// Romulan to Human
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

// Klingon to Romulan
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');

// Klingon to Human
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    var aLast = a.charAt(a.length - 1), bLast = b.charAt(b.length - 1);
    return aLast < bLast ? aLast === bLast ? 0 : -1 : 1;
  }
  return stringArray.sort(byLastLetter);
}

function sumArray(numberArray) {
  var sum = 0;
  numberArray.forEach(function(e) {
    sum += e;
  });
  return sum;
}

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    return sumArray(a) - sumArray(b);
  });
  return arrayOfArrays;
}

// lastLetterSort assertions
var strArr1 = ['baz', 'foo', 'bar'];
var strArr2 = ['baz', 'foo', 'foo', 'foo', 'bar'];
assert(lastLetterSort(strArr1).toString() === 'foo,bar,baz',
  'Array should be sorted by last character');
assert(lastLetterSort(strArr2).toString() === 'foo,foo,foo,bar,baz',
  'Array should be sorted by last character');

// sumArray assertions
var numArr1 = [1, 2, 3];
var numArr2 = [10, 20, 30];
assert(sumArray(numArr1) === 6, 'sumArray([1, 2, 3]) should equal 6');
assert(sumArray(numArr2) === 60, 'sumArray([10, 20, 30]) should equal 60');

// sumSort assertions
var arrayOfNums1 = [[1, 20, 3], [1, 1, 1], [10, 2, 3]];
var arrayOfNums2 = [[100, 50, 10], [0, 0, 0], [50, 50, 50]];

assert(sumSort(arrayOfNums1).toString() === '1,1,1,10,2,3,1,20,3',
  'sumSort(arrayOfNums1).toString() should equal 1,1,1,10,2,3,1,20,3');
assert(sumSort(arrayOfNums2).toString() === '0,0,0,50,50,50,100,50,10',
  'sumSort(arrayOfNums2).toString() should equal 0,0,0,50,50,50,100,50,10');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

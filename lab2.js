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
  // var bool = expression;
  // console.log(bool);
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

 TODO: Next, create an instance of Blob named dowingtonBlob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob(consumptionRate, townSize, name) {
  this.rate = consumptionRate;
  this.size = townSize;
  this.name = name;
  this.consumed = 0;
  this.hour = 0;
}

Blob.prototype.consumeTown = function() {
  while (this.consumed < this.size) {
    console.log('At hour ' + this.hour + ' ' + this.name + ' had consumed ' + this.consumed + ' people.');
    this.consumed += this.rate;
    this.rate++;
    this.hour++;
  }
  console.log('At hour ' + this.hour + ' ' + this.name + ' would have consumed the entire town.');
};

Blob.prototype.returnConsumeTown = function() {
  return this.hour;
};

var dowingtonBlob = new Blob(1, 1000, 'Dowington Blob');
dowingtonBlob.consumeTown();

var hoursSpentInDowington = dowingtonBlob.returnConsumeTown(); // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)
console.log(hoursSpentInDowington);

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

// TODO: implement me based on the instructions above.
// Be sure to then assign me to the Blob's prototype.

//WHOOPSE! ALREADY DID THIS.  See 'Blob.prototype.consumeTown' above.

var seattleBlob = new Blob(10000, 361010, 'Seattle Blob');
seattleBlob.consumeTown();
var vashonBlob = new Blob(100, 1000, 'Vashon Blob');
vashonBlob.consumeTown();
var testBlob = new Blob(1, 0, 'testBlob');
testBlob.consumeTown();

assert(testBlob.returnConsumeTown() === 0, 'no people means no time needed.');
assert(dowingtonBlob.returnConsumeTown() === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
// I did this whole assignment a little differently.  Hope these suffice.

assert(seattleBlob.returnConsumeTown() > 30, 'It took under 30 hours to consume Seattle.');

//these two are meant to fail
assert(vashonBlob.returnConsumeTown() > 20, 'It took under 20 hours to consume Vashon');
assert(vashonBlob.returnConsumeTown() > dowingtonBlob.returnConsumeTown(), 'Dowington took longer to be consumed than Vashon');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

console.log('*** problem 2 ***');

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

function SentientBeing(planet, language, hello) {
  this.planet = planet;
  this.language = language;
  this.hello = hello;
}

SentientBeing.prototype.sayHello = function(sb) {
  console.log(this.hello);
  // console.log(hello[sb]);
  return hello[sb];
};

var Klingon = new SentientBeing('Qo\'noS', 'klingon', hello.klingon);
var Romulan = new SentientBeing('Romulus', 'romulan', hello.romulan);
var Human = new SentientBeing('Earth', 'federation standard', hello['federation standard']);

assert(Klingon.sayHello('romulan') === 'Jolan\'tru', 'the klingon should say Jolan\'tru');
assert(Klingon.sayHello('federation standard') === 'hello', 'the klingon should say hello');
assert(Romulan.sayHello('klingon') === 'nuqneH', 'the romulan should say nuqneH');
assert(Romulan.sayHello('federation standard') === 'hello', 'the romulan should say hello');
assert(Human.sayHello('klingon') === 'nuqneH', 'the human should say nuqneH');
assert(Human.sayHello('romulan') === 'Jolan\'tru', 'the human should say Jolan\'tru');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

console.log('*** problem 3a ***');

var strArray = ['aazaaa', 'rac', 'ab', 'aalaaayaaaf', 'ad', 'tad'];

function getLastLetter(array) {
  var lastLetArray = [];
  for (var i = 0; i < array.length; i++) {
    lastLetArray.push(array[i].slice(-1));
  }
  return lastLetArray;
}

function compareLastLetter(stringArray) {
  var mySortArray = getLastLetter(stringArray);
  function sortByComparison() {
    for (var i = 0; i < mySortArray.length; i++) {
      if (mySortArray[i] < mySortArray[i + 1]) {
        return -1;
      } else if (mySortArray[i] > mySortArray[i + 1]) {
        return 1;
      } else if (mySortArray[i] === mySortArray[i + 1]) {
        return 0;
      }
    }
  }
  mySortArray.sort(sortByComparison());
  // console.log(mySortArray);
  return mySortArray;
}

compareLastLetter(strArray);

assert(compareLastLetter(strArray) === ['a', 'b', 'c', 'd', 'd', 'f'], 'the arrays should match');
console.log('I can\'t seem to get this assertino to work.  Whenever I log the value outside the function, it converts to the string "a,b,c,d,d,f" but inside the function it logs as the array of string values.  Messed with it but can\'t get the assertion to pass');

console.log('*** problem 3b ***');

var numArray = [3, 4, 5, 6, 7, 8];
var numArray2 = [8, 9, 10, 11, 12, 13];
var numArray3 = [88, 89, 90];
var numArray4 = [1, 2, 3];

function sumArray(numberArray) {
  var sum = 0;
  numberArray.forEach(function(entry) {
    sum += entry;
  });
  // console.log(sum);
  return sum;
}

sumArray(numArray);
sumArray(numArray2);
sumArray(numArray3);
sumArray(numArray4);

assert(sumArray(numArray) === 33, 'the sum of the array should be 33');
assert(sumArray(numArray4) === 6, 'the sum of the array should be 6');

console.log('*** problem 3c ***');

var group = [numArray, numArray2, numArray3, numArray4];

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    return sumArray(a) - sumArray(b);
  });
  // console.log(arrayOfArrays);
  return arrayOfArrays;
}

sumSort(group);
assert(sumSort(group) === '[ [ 1, 2, 3 ],\n[ 3, 4, 5, 6, 7, 8 ],\n[ 8, 9, 10, 11, 12, 13 ],\n[ 88, 89, 90 ] ]', 'the array did not reorder correctly');
console.log('again, mystified why this assertion doesn\'t work.  tried it a whole bunch of different ways.');

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

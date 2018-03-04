const { Observable } = require('rxjs');
const { observer } = require('../../utils');

const aString = 'I am a string'; // A collection of characters
const arr = [1, 2, 3]; // A collection of numbers
const promise = new Promise((resolve, reject) => resolve(true)); // A collection of one Promise

// This is true
Observable.of(1, 2, 3)
  .sequenceEqual(Observable.from(arr))
//   .subscribe(observer('sequenceEqual true'));

// This is false
Observable.of(arr)
  .sequenceEqual(Observable.from(arr))
//   .subscribe(observer('sequenceEqual false'));

/**
 *      Of
 *      Pass a collection in it's whole form down the stream
 */
Observable.of(
    aString
    // arr
    // 1, 2, 3
    // promise // This will push the Promise the stream
)
// .subscribe(observer('of'));

/**
 *      From
 *      Break down the collection and send each item down the stream
 *      Observable, Promise, Array, or Iterable
 */
Observable.from(
    aString
    // arr
    // 1, 2, 3 // This is not valid
    // promise // This will unpack the value of the Promise
)
// .subscribe(observer('from'));

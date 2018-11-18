const { of, from } = require('rxjs')
const { sequenceEqual } = require('rxjs/operators')
const { observer } = require('../../utils')

const aString = 'I am a string' // A collection of characters
const arr = [1, 2, 3] // A collection of numbers
const promise = new Promise((resolve, reject) => resolve(true)) // A collection of one Promise

// This is true
of(1, 2, 3).pipe(sequenceEqual(from(arr)))
  // .subscribe(observer('sequenceEqual true')); // With RxJS 6.3.3 this is working, but throws a TypeError after completion

// This is false
of(arr).pipe(sequenceEqual(from(arr)))
  // .subscribe(observer('sequenceEqual false')); // With RxJS 6.3.3 this is working, but throws a TypeError after completion

/**
 *      Of
 *      Pass a collection in it's whole form down the stream
 */
of(
  // aString,
  // arr
  // 1, 2, 3
  // promise // This will push the Promise down the stream
)
// .subscribe(observer('of'));

/**
 *      From
 *      Break down the collection and send each item down the stream
 *      Observable, Promise, Array, or Iterable
 */
from(
  // aString,
  // arr
  // 1, 2, 3 // This is not valid
  // promise // This will unpack the value of the Promise
)
// .subscribe(observer('from'));

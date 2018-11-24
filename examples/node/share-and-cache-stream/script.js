const axios = require('axios')
const { of, from, interval } = require('rxjs')
const {
  publish,
  publishReplay,
  refCount,
  share,
  shareReplay,
  take,
  tap,
  pluck,
  filter,
  mergeMap,
} = require('rxjs/operators')
const { observer } = require('../utils')



// const event = interval(500).pipe(take(3),
const event = of('event').pipe(
  tap(() => console.log('[ side effect ]')),
  // share(),
  // publish(),
  // publishReplay(),
  // refCount(), // play with this versus the `connect` below in the setTimeout
  // shareReplay(),
)

// event.subscribe(observer("a"))
// event.subscribe(observer("b"))

// Required for the publish() and publishReplay() operators
setTimeout(() => {
  //     event.connect()
}, 50)

setTimeout(() => {
  //         event.subscribe(observer("c"))
}, 1000)

/**
 *      Caching and Sharing of XHR Request
 *      Remove the shareReplay to see multiple XHR requests being made
 *      Add it back on to see only one request made
 */
const samplePage$ = from(
  axios.get('https://ey-intuitive.com/wp-json/wp/v2/pages'),
).pipe(
  tap(() => console.log('[ requesting data from source ]')),
  mergeMap(({ data }) => data),
  filter(({ slug }) => slug === 'careers'),
  pluck('title', 'rendered'),
  shareReplay(),
)

samplePage$.subscribe(observer("a"))
samplePage$.subscribe(observer("b"))

setTimeout(() => {
  samplePage$.subscribe(observer("c"))
}, 1000)

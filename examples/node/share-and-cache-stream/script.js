const { Observable, timer } = require("rxjs")

const axios = require('axios')

const { observer } = require("../utils")

// const event = Observable.interval(500).take(3)
const event = Observable.of("event")
        .do(() => console.log("[ side effect ]"))
        // .share()
        // .publish()
        // .publish().refCount()
        // .publishReplay()
        // .publishReplay().refCount()
        // .shareReplay()

// event.subscribe(observer("a"))
// event.subscribe(observer("b"))

// Required for the publish() and publishReplay() operators
setTimeout(() => {
//     event.connect()
}, 50);

setTimeout(() => {
//         event.subscribe(observer("c"))
}, 1000)


/**
 *      Caching and Sharing of XHR Request
 *      Remove the shareReplay to see multiple XHR requests being made
 *      Add it back on to see only one request made
 */

const samplePage$ = Observable.from(axios.get('http://demo.wp-api.org/wp-json/wp/v2/pages'))
        .do(() => console.log('[ requesting data from source ]'))
        .mergeMap(({data}) => data)
        .filter(({slug}) => slug === 'sample-page')
        .map(page => page.title.rendered)
        .shareReplay(1)

// samplePage$.subscribe(observer("a"))
// samplePage$.subscribe(observer("b"))

setTimeout(() => {
        // samplePage$.subscribe(observer("c"))
}, 1000)
const { Observable, interval } = require("rxjs")
const { switchMap, switchMapTo } = require("rxjs/operators")

const foo$ = Observable.of("foo")

const seconds$ = Observable.interval(1000)

/**
 *      These examples are trival
 *      switchMap and switchMapTo is great when we have events coming from upstream (A)
 *      And those events need to trigger a new stream (B)
 *      The cavet here, is that whenever a new event (A) comes downstream
 *      We want to -switch to- a new stream (B), 
 *      If (B) was already in progress and a new event (A) came down, we cancel the in-progress (B) stream
 *      And switch to a brand new (B) stream, throwing out the one that was in progress
 * 
 *      switchMap also allows us to handle new async streams, as opposed to map
 *      Which is a very powerful feature!
 */

seconds$
    .pipe(
        switchMap(() => foo$)
    )
    // .subscribe(ev => console.log(ev))

seconds$
    .pipe(
        switchMapTo(foo$)
    )
    // .subscribe(ev => console.log(ev))

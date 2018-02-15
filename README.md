# RxJS Examples
 - `yarn` to install dependencies
 - `yarn start` to start the http server

Front-end and Node examples with RxJS

The Node examples aren't really good "Node" examples yet, they're just in a Node environment. More to come.

# Rx is...
 - A unified API for async operations - Seth House
 - Lodash for async/events - Ben Lesh

> _The real answer lies in how you use it_ - Ben Lesh
>
> _It’s about manipulating Observables, which are push-based sets_ - Ben Lesh
>
> _Reactive Programming allows you to specify the dynamic behavior of a value at declaration_ - André Staltz
> 
> _Reactive programming is programming with asynchronous data streams._ - André Staltz

# Notable Influencers
 - Ben Lesh [@BenLesh](https://twitter.com/BenLesh)
 - André Staltz [@andrestaltz](https://twitter.com/andrestaltz)
 - Seth House [@whiteinge](https://twitter.com/whiteinge)
 - Erik Meijer [@headinthebox](https://twitter.com/headinthebox)



| Operator | Example |
| --- |---|
| [buffer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-buffer) | [Event Bus with Subjects](/examples/http/scripts/event-bus-with-subjects.js) |
| [bufferCount](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-bufferCount) | [Konami Code](/examples/http/scripts/konami-code.js) |
| [catch](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-catch) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [combineLatest](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-combineLatest) | [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js) |
| [concatMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap) | [Subsequent XHR Requests](/examples/node/subsequent-xhr-requests.js) |
| [defer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-defer) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [filter](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter) | [Konami Code](/examples/http/scripts/konami-code.js) </br> [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js)|
| [first](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-first) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [from](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from) | [Subsequent XHR Requests](/examples/node/subsequent-xhr-requests.js) </br> [Konami Code](/examples/http/scripts/konami-code.js) |
| [fromEvent](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent) | [Event Bus with Subjects](/examples/http/scripts/event-bus-with-subjects.js) </br> [Konami Code](/examples/http/scripts/konami-code.js) </br> [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js)|
| [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map) | [Event Bus with Subjects](/examples/http/scripts/event-bus-with-subjects.js) </br> [Konami Code](/examples/http/scripts/konami-code.js) |
| [mapTo](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mapTo) | [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js) |
| [merge](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-merge) | [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js) |
| [mergeMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap) | [Konami Code](/examples/http/scripts/konami-code.js) </br> [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [of](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-of) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [range](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-range) | [Subsequent XHR Requests](/examples/node/subsequent-xhr-requests.js) </br> [Retry with Backoff](/examples/node/retry-with-backoff.js)|
| [retryWhen](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-retryWhen) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [startWith](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-startWith) | [Move Element with Arrows](/examples/http/scripts/move-el-with-arrows.js) |
| [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) | [Subsequent XHR Requests](/examples/node/subsequent-xhr-requests.js) |
| [throw](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-throw) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [timer](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-timer) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |
| [zip](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-zip) | [Retry with Backoff](/examples/node/retry-with-backoff.js) |

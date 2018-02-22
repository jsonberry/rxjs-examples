
- [Example One: Observable.of("event")](#observableOf)
- [Example Two: Observable.interval](#observableInterval)
- [Example Three: Observable.from(xhr request)](#observableFromXhr)

# Example: Observable.of("event")<a name="observableOf"></a>
## No Sharing
```bash
[ side effect ]
a [ next ] event
a [ done ]
[ side effect ]
b [ next ] event
b [ done ]
[ side effect ]
c [ next ] event
c [ done ]
```

## share()
*Share source among multiple subscribers.*
```bash
[ side effect ]
a [ next ] event
a [ done ]
[ side effect ]
b [ next ] event
b [ done ]
[ side effect ]
c [ next ] event
c [ done ]
```
### TODO: make share example that shows off the multicasting

In this example, share looks exactly the same as not sharing.
This is because the Observables are completing before the next one subscribes.

Share will...
> unsubscribe from the source Observable...[and]...will resubscribe to the original source [when new subscriptions are made].

Share _does_ make the source Observable `hot`, so it will `multicast` to subscriptions, but they have to be open at the same time.

## publish() 
*Share source and make hot by calling connect.*
```bash
[ side effect ]
a [ next ] event
b [ next ] event
a [ done ]
b [ done ]
c [ done ]
```

`a` and `b` are synchronus subscriptions made right after each other. They are both made before calling `connect` on the `published` Observable. Once we call connect, we turn the stream on and anything subscribed to it will get events multicasted.

This is why we see events for `a` and `b`, but not `c`. `C` subscribes _after_ all open subscriptions have closed, and publish does not reconnect to the source after all subscriptions have closed.

## publish().refCount()
```bash
[ side effect ]
a [ next ] event
a [ done ]
b [ done ]
c [ done ]
```

Because `refCount` is being used with `publish`, the Observable stream is immediately turned `hot`, and `a` completes before `b` has chance to connect... as opposed to calling `connect` on the published stream.

[refCount](http://reactivex.io/rxjs/test-file/spec-js/operators/refCount-spec.js.html) will:
- should turn a multicasted Observable an automatically (dis)connecting hot one (no `connect` required for a published Observable)
- should count references
- should unsub from the source when all other subscriptions are unsubbed

refCount does not appear to publically take any arguments. I've seen examples of people passing numbers to refCount, but I think that's only an internal mechanism of the [ConnectableObservable class](http://reactivex.io/rxjs/file/es6/observable/ConnectableObservable.js.html).

## publishReplay()
```bash
[ side effect ]
a [ next ] event
b [ next ] event
a [ done ]
b [ done ]
c [ next ] event
c [ done ]
```

- Behaves similar to `publish`, where it makes the stream hot and requires a connect or a refCount for events to start flowing downstream
- can pass a numberic buffer size, which is the number of events that will be sent to new subscribers
- "only replays what happens", if there is an error in the stream, the error will be multicasted to subscribers, the source stream will not be retried
- will emit replayed values plus completed when subscribed after completed

## publishReplay().refCount()
```bash
[ side effect ]
a [ next ] event
a [ done ]
b [ next ] event
b [ done ]
c [ next ] event
c [ done ]
```

## shareReplay()
```bash
[ side effect ]
a [ next ] event
a [ done ]
b [ next ] event
b [ done ]
c [ next ] event
c [ done ]
```
From the [pull request](https://github.com/ReactiveX/rxjs/pull/2443) from Ben Lesh that added shareReplay back in: 
> shareReplay returns an observable that is the source multicasted over a ReplaySubject. That replay subject is recycled on error from the source, but not on completion of the source. This makes shareReplay ideal for handling things like caching AJAX results, as it's retryable. It's repeat behavior, however, differs from share in that it will not repeat the source observable, rather it will repeat the source observable's values.

# Example: Observable.interval(1000)<a name="observableInterval"></a>

With the nature of `interval`, each event is new, so the side effect will fire for each new event - not for every subscription (depending on the operator), but for _every new event_ coming down the stream.

## No Sharing
```bash
[ side effect ]
a [ next ] 0
[ side effect ]
b [ next ] 0
[ side effect ]
a [ next ] 1
[ side effect ]
b [ next ] 1
[ side effect ]
c [ next ] 0
[ side effect ]
a [ next ] 2
a [ done ]
[ side effect ]
b [ next ] 2
b [ done ]
[ side effect ]
c [ next ] 1
[ side effect ]
c [ next ] 2
c [ done ]
```
## share()
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```
## publish() 
*Share source and make hot by calling connect.*
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```
## publish().refCount()
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```
## publishReplay()
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
c [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```
## publishReplay().refCount()
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
c [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```

## shareReplay()
```bash
[ side effect ]
a [ next ] 0
b [ next ] 0
c [ next ] 0
[ side effect ]
a [ next ] 1
b [ next ] 1
c [ next ] 1
[ side effect ]
a [ next ] 2
b [ next ] 2
c [ next ] 2
a [ done ]
b [ done ]
c [ done ]
```

# Example: Observable.from(xhr requeset)<a name="observableFromXhr"></a>

## No Sharing / Caching
```bash
[ requesting data from source ]
a [ next ] Sample Page
a [ done ]
[ requesting data from source ]
b [ next ] Sample Page
b [ done ]
[ requesting data from source ]
c [ next ] Sample Page
c [ done ]
```

## shareReplay(1)
```bash
[ requesting data from source ]
a [ next ] Sample Page
b [ next ] Sample Page
a [ done ]
b [ done ]
c [ next ] Sample Page
c [ done ]
```
const { Observable } = require('rxjs')

const retryWithBackoff = (attempts, fallback) => stream =>
        stream
                .retryWhen(errors => {
                        return errors
                                .do(ev => console.log(ev))
                                .zip(Observable.range(1, attempts + 1))
                                .mergeMap(([error, i]) => {
                                        if (i > attempts) {
                                                return Observable.throw(error)
                                        }

                                        console.log(
                                                `Retrying after ${i} seconds`,
                                        )
                                        return Observable.timer(i * 1000).take(
                                                1,
                                        )
                                })
                })
                .catch(_ => fallback)

let foo = null

setTimeout(() => {
        foo = 'foo'
}, 5000)

Observable.interval(1000)
        .first()
        .mergeMap(() =>
                // defer here because if not, we would always be trying to create an observable of null
                // with the defer, on every retry, we try to get a fresh pull of foo
                Observable.defer(() => Observable.of(foo))
                        .map(ev => {
                                if (!ev) {
                                        throw ev
                                } else {
                                        return ev
                                }
                        })
                        .let( // need to upgrade this to use pipe instead
                                retryWithBackoff(
                                        4,
                                        Observable.of(
                                                'Uh oh! Something went wrong',
                                        ),
                                ),
                        ),
        )
        .subscribe(ev => console.log(ev))

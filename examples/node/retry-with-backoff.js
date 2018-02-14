const { Observable } = require('rxjs')

const retryWithBackoff = (retries, fallback) => stream =>
        stream
                .retryWhen(errors => {
                        return errors
                                .zip(Observable.range(1, retries + 1))
                                .mergeMap(([error, i]) => {
                                        if (i > retries) {
                                                return Observable.throw(error)
                                        }

                                        return Observable
                                                .timer(Math.pow(2.71828, i))
                                                .take(1)
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

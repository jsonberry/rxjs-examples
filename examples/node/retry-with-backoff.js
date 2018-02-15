const { Observable } = require('rxjs')

const retryWithBackoff = ({
        fallback = Observable.empty(),
        retries = 5,
        strategy = 'linear',
        timeout = 15000,
}) => stream =>
        stream
                .retryWhen(errors => {
                        return errors
                                .timeout(timeout)
                                .zip(Observable.range(1, retries + 1))
                                .mergeMap(([error, i]) => {
                                        if (i > retries) {
                                                return Observable.throw(error)
                                        }

                                        let backoff
                                        switch (strategy) {
                                                case 'linear':
                                                        backoff = i * 1000
                                                        break

                                                case 'exponential':
                                                        backoff = Math.pow(
                                                                2.71828,
                                                                i,
                                                        )
                                                        break

                                                default:
                                                        backoff = i * 1000
                                        }

                                        return Observable.timer(backoff)
                                })
                })
                .catch(_ => fallback)

let foo = null

// setTimeout(() => {
//         foo = 'foo'
// }, 5000)

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
                        .let(
                                // need to upgrade this to use pipe instead
                                retryWithBackoff({
                                        fallback: Observable.of(
                                                'I am a fallback',
                                        ),
                                        retries: 9,
                                        strategy: 'exponential',
                                        timeout: 3000,
                                }),
                        ),
        )
        .subscribe(ev => console.log(ev))

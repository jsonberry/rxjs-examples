const { Observable, defer, of, range, timer, timeout, zip } = require('rxjs')
const { catchError, map, mergeMap, retryWhen } = require('rxjs/operators')

let foo = null

setTimeout(() => {
  foo = 'foo'
}, 5000)

const retryWithBackoff = ({
  fallback = Observable.empty(),
  retries = 5,
  strategy = 'linear',
  timeout = 15000,
}) => stream$ =>
  stream$.pipe(
    retryWhen(errors$ =>
      errors$
        .timeout(timeout)
        .zip(Observable.range(1, retries + 1))
        .pipe(
          mergeMap(([error, i]) => {
            if (i > retries) {
              return Observable.throw(error)
            }

            switch (strategy) {
              case 'linear':
                return Observable.timer(i * 1000)

              case 'exponential':
                return Observable.timer(Math.pow(2.71828, i))
            }
          }),
        ),
    ),
    catchError(_ => fallback),
  )

Observable.defer(() => Observable.of(foo))
  .pipe(
    map(ev => {
      if (!ev) {
        throw ev
      } else {
        return ev
      }
    }),
    retryWithBackoff({
      fallback: Observable.of('I am a fallback'),
      retries: 10,
      strategy: 'exponential',
      timeout: 3000, // Try increasing or removing this timeout to see "foo" come through, instead of the fallback
    }),
  )
  .subscribe(ev => console.log(ev))

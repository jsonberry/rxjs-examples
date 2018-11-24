const { defer, EMPTY, of, range, throwError, timer } = require('rxjs')
const {
  catchError,
  map,
  mergeMap,
  retryWhen,
  timeout,
  zip,
} = require('rxjs/operators')
const { observer } = require('../utils')

let foo = null

setTimeout(() => {
  foo = 'foo'
}, 5000)

const retryWithBackoff = ({
  fallback = EMPTY,
  retries = 5,
  strategy = 'linear',
  _timeout = 15000,
}) => stream$ =>
  stream$.pipe(
    retryWhen(errors$ =>
      errors$.pipe(
        timeout(_timeout),
        zip(range(1, retries + 1)),
        mergeMap(([error, attempt]) => {
          console.log(error, attempt, retries);
          if (attempt > retries) {
            return throwError(error)
          }

          switch (strategy) {
            case 'linear':
              return timer(attempt * 1000)

            case 'exponential':
              return timer(Math.pow(Math.E, attempt))
          }
        }),
      ),
    ),
    catchError(_ => fallback),
  )

defer(() => of(foo))
  .pipe(
    map(ev => {
      if (!ev) {
        throw ev
      } else {
        return ev
      }
    }),
    retryWithBackoff({
      fallback: of('I am a fallback'),
      retries: 10,
      strategy: 'exponential',
      _timeout: 3000, // Try increasing or removing this timeout to see "foo" come through, instead of the fallback
    }),
  )
  .subscribe(observer('retryWithBackoff'))

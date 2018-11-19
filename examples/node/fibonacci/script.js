const { interval } = require('rxjs')
const { scan, take } = require('rxjs/operators')

interval(10)
  .pipe(
    scan(acc => ({
      next: acc.next + acc.previous,
      previous: acc.next,
    }), { previous: 1, next: 0 }),
    take(20), // just so we don't get to Infinity
  )
  .subscribe(num => console.log(`Fibonacci: ${num.previous}`))

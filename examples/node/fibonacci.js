const { Observable } = require("rxjs")

const initialConditions = { term1: 0, term0: 1 }
const iterations = 10
const fibonacciSequencer = acc => ({
        term1: acc.term0,
        term0: acc.term0 + acc.term1,
})

Observable.interval(250)
        .scan(fibonacciSequencer, initialConditions)
        .startWith(initialConditions)
        .take(iterations)
        .subscribe(({term0, term1}) => console.log(`Fibonacci: ${term0 + term1}`))

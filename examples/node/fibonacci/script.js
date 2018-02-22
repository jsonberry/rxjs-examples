const { Observable } = require("rxjs")
const { scan, startWith, take, map } = require("rxjs/operators")

const initialConditions = { term1: 0, term0: 1 }
const iterations = 10
const sequencer = acc => ({
        term1: acc.term0,
        term0: acc.term0 + acc.term1,
})
const fibonacciSequencer = scan(sequencer, initialConditions)
const fibonacciNumber = map(({term0, term1}) => term0 + term1)

Observable.interval(250)
        .pipe(
            fibonacciSequencer,
            startWith(initialConditions),
            fibonacciNumber,
            take(iterations),
        )
        .subscribe(num => console.log(`Fibonacci: ${num}`))

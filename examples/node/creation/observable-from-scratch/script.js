const { Observable } = require('rxjs')
const faker = require('faker')
const { observer } = require('../../utils')

const num = () => {
  return new Promise((resolve, reject) => {
    const num = faker.random.number({ max: 10 })
    setTimeout(() => {
      if (num % 2 === 0) {
        resolve(num)
      } else {
        reject(new Error('The value was odd!'))
      }
    }, 500)
  })
}

// Named this Subscriber because that's the name of the parameter in RxJS
// A more descriptive name might be "producer" here
// Also the param in the func is the Observer API
// Inside this producer we sort of make API calls to the Observer API
const subscriber = _observer => {
  const intervalId = setInterval(async () => {
    try {
      const number = await num()
      if (number < 9) {
        console.log('Number was under 9:', number)
        _observer.next(number)
      } else {
        console.log('Number was 9 or over:', number)
        console.log('TearDown Trigger: Completion')
        _observer.complete()
      }
    } catch (err) {
      console.log('TearDown Trigger: Error')
      _observer.error(err)
    }
  }, 1000)

  return () => {
    console.log('')
    console.log('----------- TearDownLogic Triggered ----------------')
    console.log('-------------- Clearing Interval -------------------')
    console.log('')
    clearInterval(intervalId)
    console.log('--------- This was triggered by either: ------------')
    console.log('[ Completion ] / [ Error ] / [ Explicit Unsubscription ]')
    console.log('')
    console.log('In the example observable created, we used setInterval')
    console.log('We use the teardown logic to clear the interval ID')
  }
}

const sub$ = new Observable(subscriber).subscribe(
  observer('Observable from Scratch'),
)

// If you uncomment the setTimeout it will force the script to wait for the setTimeout threshold before finally unsubscribing
// if an error occurs before the threshold, TearDown logic will run, but the script will still run
// until the setTimeout threshold is met. If the Observable completes or errors out before the explicit unsubscription,
// the teardown logic won't be ran because it would have already been triggered
// setTimeout(() => {
//     console.log('TearDown Trigger: Explicit Unsubscription')
//     sub$.unsubscribe()
// }, 1600);

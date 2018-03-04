const { Observable } = require("rxjs")
const faker = require("faker")

const num = () => {
        return new Promise((resolve, reject) => {
                const num = faker.random.number({max: 10})
                setTimeout(() => {
                    if (num % 2 === 0) {
                        resolve(num)
                    } else {
                        reject(new Error("The value was odd!"))
                    }
                }, 500)
        })
}

// Named this onSubscription because that's the name of the parameter in RxJS
// A more descriptive name might be "producer" here
// Also the param in the func is the Observer API
// Inside this producer we sort of make API calls to the Observer API
const onSubscription = observer => {
        const intervalId = setInterval(async () => {
            try {
                    const number = await num()
                    if (number < 9) {
                        console.log('Number was under 9:', number);
                        observer.next(number)
                    } else {
                        console.log('Number was 9 or over:', number);
                        console.log('TearDown Trigger: Completion')
                        observer.complete()
                    }

            } catch (err) {
                    console.log('TearDown Trigger: Error')
                    observer.error(err)
            }
        }, 1000)

        return () => {
            console.log('---------------- TearDownLogic ---------------------')
            console.log('--------- This was triggered by either: ------------')
            console.log('--- [ Completion ] - [ Error ] - [ Implicit Unsubscription ] ---')
            clearInterval(intervalId)
        }
}

const observer = {
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log("done"),
}

const sub$ = Observable.create(onSubscription).subscribe(observer)


// If you uncomment the setTimeout it will force the script wait for the setTimeout threshold before finally unsubscribing
// if an error occurs before the threshold, TearDown logic will run, but the script will still run
// until the setTimeout threshold is met
// setTimeout(() => {
//     console.log('TearDown Trigger: Implicit Unsubscription')
//     sub$.unsubscribe()
// }, 1600);
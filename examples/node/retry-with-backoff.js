const { Observable } = require("rxjs")

const retryWithBackoff = ({
        fallback = Observable.empty(),
        retries = 5,
        strategy = "linear",
        timeout = 15000,
}) => stream =>
        stream
                .retryWhen(errors$ =>
                        errors$
                                .timeout(timeout)
                                .zip(Observable.range(1, retries + 1))
                                .mergeMap(([error, i]) => {
                                        if (i > retries) {
                                                return Observable.throw(error)
                                        }
                                        switch (strategy) {
                                                case "linear":
                                                        console.log(
                                                                `Retrying after ${i *
                                                                        1000} milliseconds`,
                                                        )
                                                        return Observable.timer(
                                                                i * 1000,
                                                        )

                                                case "exponential":
                                                        console.log(
                                                                `Retrying after ${Math.pow(
                                                                        2.71828,
                                                                        i,
                                                                )} milliseconds`,
                                                        )
                                                        return Observable.timer(
                                                                Math.pow(
                                                                        2.71828,
                                                                        i,
                                                                ),
                                                        )
                                        }
                                }),
                )
                .catch(_ => fallback)

let foo = null

setTimeout(() => {
        foo = "foo"
}, 5000)

Observable.defer(() => Observable.of(foo))
        .map(ev => {
                if (!ev) {
                        throw ev
                } else {
                        return ev
                }
        })
        .let(
                // TODO: upgrade this to use the pipe operator instead
                retryWithBackoff({
                        fallback: Observable.of("I am a fallback"),
                        retries: 9,
                        strategy: "exponential",
                        timeout: 3000,
                }),
        )
        .subscribe(ev => console.log(ev))

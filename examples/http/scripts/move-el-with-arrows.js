import { dqs } from "./util.js"
const Observable = Rx.Observable

const circle = dqs("#circle")
const keyDown$ = Observable.fromEvent(window, "keydown").share()
const keyUp$ = Observable.fromEvent(window, "keyup").share()
const distance$ = Observable.of(10)

const createControlStream = code => {
        const on$ = keyDown$.filter(ev => ev.code === code)
        const off$ = keyUp$.filter(ev => ev.code === code)
        return Observable.merge(on$.mapTo(true), off$.mapTo(false)).startWith(
                false,
        )
}

const controls$ = Observable.combineLatest(
        createControlStream("ArrowUp"),
        createControlStream("ArrowDown"),
        createControlStream("ArrowLeft"),
        createControlStream("ArrowRight"),
        distance$,
)

const direction$ = controls$.map(([UP, DOWN, LEFT, RIGHT, DISTANCE]) => ({
        UP,
        DOWN,
        LEFT,
        RIGHT,
        DISTANCE,
}))

const move = ({ UP, DOWN, LEFT, RIGHT, DISTANCE }) => {
        const pos = circle.getBoundingClientRect()
        let top = pos.top
        let left = pos.left

        if (UP) {
                top -= DISTANCE
        }

        if (DOWN) {
                top += DISTANCE
        }

        if (LEFT) {
                left -= DISTANCE
        }

        if (RIGHT) {
                left += DISTANCE
        }

        circle.style.top = top
        circle.style.left = left
}

direction$.subscribe(move)

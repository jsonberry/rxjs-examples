import { dqs } from './util.js'

const circle = dqs('#circle')
const keyDown$ = Rx.Observable.fromEvent(window, 'keydown').share()
const keyUp$ = Rx.Observable.fromEvent(window, 'keyup').share()

const createControlStream = (code) => {
        const on$ = keyDown$.filter(ev => ev.code === code)
        const off$ = keyUp$.filter(ev => ev.code === code)
        return Rx.Observable.merge(
                on$.mapTo(true),
                off$.mapTo(false),
        ).startWith(false)
}

const controls$ = Rx.Observable.combineLatest(
    createControlStream('ArrowUp'),
    createControlStream('ArrowDown'),
    createControlStream('ArrowLeft'),
    createControlStream('ArrowRight'),
    Rx.Observable.of(10),
)

const direction$ = controls$.map(([UP, DOWN, LEFT, RIGHT, LENGTH]) => ({
    UP,
    DOWN,
    LEFT,
    RIGHT,
    LENGTH
}))

const move = ({ UP, DOWN, LEFT, RIGHT, LENGTH }) => {
    const pos = circle.getBoundingClientRect()
    let top = pos.top
    let left = pos.left

    if (UP) {
            top -= LENGTH
    }

    if (DOWN) {
            top += LENGTH
    }

    if (LEFT) {
            left -= LENGTH
    }

    if (RIGHT) {
            left += LENGTH
    }

    circle.style.top = top
    circle.style.left = left
}

direction$.subscribe(move)

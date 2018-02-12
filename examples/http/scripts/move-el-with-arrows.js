import { dqs } from './util.js'

const circle = dqs('#circle')
const pxToMove = 10

const keyDown$ = Rx.Observable.fromEvent(window, 'keydown').share()
const keyUp$ = Rx.Observable.fromEvent(window, 'keyup').share()

const arrowUpOn$ = keyDown$.filter(ev => ev.code === 'ArrowUp')
const arrowUpOff$ = keyUp$.filter(ev => ev.code === 'ArrowUp')
const arrowUp$ = Rx.Observable.merge(
        arrowUpOn$.mapTo(true),
        arrowUpOff$.mapTo(false),
).startWith(false)

const arrowDownOn$ = keyDown$.filter(ev => ev.code === 'ArrowDown')
const arrowDownOff$ = keyUp$.filter(ev => ev.code === 'ArrowDown')
const arrowDown$ = Rx.Observable.merge(
        arrowDownOn$.mapTo(true),
        arrowDownOff$.mapTo(false),
).startWith(false)

const arrowLeftOn$ = keyDown$.filter(ev => ev.code === 'ArrowLeft')
const arrowLeftOff$ = keyUp$.filter(ev => ev.code === 'ArrowLeft')
const arrowLeft$ = Rx.Observable.merge(
        arrowLeftOn$.mapTo(true),
        arrowLeftOff$.mapTo(false),
).startWith(false)

const arrowRightOn$ = keyDown$.filter(ev => ev.code === 'ArrowRight')
const arrowRightOff$ = keyUp$.filter(ev => ev.code === 'ArrowRight')
const arrowRight$ = Rx.Observable.merge(
        arrowRightOn$.mapTo(true),
        arrowRightOff$.mapTo(false),
).startWith(false)

const controls$ = Rx.Observable.combineLatest(
        arrowUp$,
        arrowDown$,
        arrowLeft$,
        arrowRight$,
).map(([UP, DOWN, LEFT, RIGHT]) => ({
    UP,
    DOWN,
    LEFT,
    RIGHT,
}))

controls$.subscribe(ev => {
        const pos = circle.getBoundingClientRect()
        let top = pos.top
        let left = pos.left

        if (ev.UP) {
            top -= pxToMove
        }

        if (ev.DOWN) {
            top += pxToMove
        }

        if (ev.LEFT) {
            left -= pxToMove
        }

        if (ev.RIGHT) {
            left += pxToMove
        }

        circle.style.top = top
        circle.style.left = left
})
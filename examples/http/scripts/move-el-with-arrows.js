import { dqs } from './utils.js'
const { fromEvent, of, merge, combineLatest } = rxjs
const { filter, mapTo, startWith, share, map } = rxjs.operators

const circle = dqs('#circle')
const keyDown$ = fromEvent(window, 'keydown').pipe(share())
const keyUp$ = fromEvent(window, 'keyup').pipe(share())
const distance$ = of(10)

const createControlStream = code => {
  const codeFilter = filter(ev => ev.code === code)
  const on$ = keyDown$.pipe(codeFilter)
  const off$ = keyUp$.pipe(codeFilter)
  return merge(on$.pipe(mapTo(true)), off$.pipe(mapTo(false))).pipe(
    startWith(false),
  )
}

const controls$ = combineLatest(
  createControlStream('ArrowUp'),
  createControlStream('ArrowDown'),
  createControlStream('ArrowLeft'),
  createControlStream('ArrowRight'),
  distance$,
)

const direction$ = controls$.pipe(
  map(([UP, DOWN, LEFT, RIGHT, DISTANCE]) => ({
    UP,
    DOWN,
    LEFT,
    RIGHT,
    DISTANCE,
  })),
)

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

// DOM helpers, utilizing javascript modules
import { dqs } from './utils.js'
// RxJS is globally available in the HTML via a CDN
const { fromEvent, defer, of, merge } = rxjs
const {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  switchMapTo,
  takeUntil,
} = rxjs.operators

// Grab the circle SVG
const circle = dqs('#circle')

// Setup streams we want to use
const mouseDown$ = fromEvent(circle, 'mousedown')
const mouseUp$ = fromEvent(circle, 'mouseup')
const mouseMove$ = fromEvent(circle, 'mousemove')
const mouseLeave$ = fromEvent(circle, 'mouseleave')

mouseDown$
  .pipe(
    switchMap(mouseDownEvent => {
      const startX = mouseDownEvent.offsetX
      const startY = mouseDownEvent.offsetY

      return mouseMove$.pipe(
        map(mouseMoveEvent => ({
          left: mouseMoveEvent.clientX - startX,
          top: mouseMoveEvent.clientY - startY,
        })),
        takeUntil(merge(mouseUp$, mouseLeave$)),
      )
    }),
  )
  .subscribe(pos => {
    circle.style.top = pos.top
    circle.style.left = pos.left
  })

/**
 * The rest is unrelated to the drag-and-drop functionality
 * It's just to help show the changing of the X and Y coords of the circle
 */
// Rip of https://github.com/jsonberry/rxjs-toolkit/blob/master/src/lib/pick.ts
// Lodash is globally available in the HTML via a CDN
const pick = (...args) => source => map(source => _.pick(source, args))

const yCoord = dqs('#yCoord')
const xCoord = dqs('#xCoord')
const pos$ = defer(() => of(circle.getBoundingClientRect()))

mouseMove$
  .pipe(
    startWith(pos$),
    switchMapTo(pos$),
    pick('x', 'y'),
    distinctUntilChanged((old, curr) => old.x === curr.x && old.y === curr.y),
  )
  .subscribe(({ x, y }) => {
    yCoord.textContent = y
    xCoord.textContent = x
  })

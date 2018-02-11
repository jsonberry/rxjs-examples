import { dqs } from './util.js'

const circle = dqs('#circle')

const mouseDown$ = Rx.Observable.fromEvent(circle, 'mousedown')
const mouseUp$ = Rx.Observable.fromEvent(circle, 'mouseup')
const mouseMove$ = Rx.Observable.fromEvent(circle, 'mousemove')

mouseDown$
        .concatMap(ev => {
                const startX = ev.offsetX
                const startY = ev.offsetY

                return mouseMove$
                        .map(ev => ({
                                left: ev.clientX - startX,
                                top: ev.clientY - startY,
                        }))
                        .takeUntil(mouseUp$)
        })
        .subscribe(pos => {
                circle.style.top = pos.top
                circle.style.left = pos.left
        })
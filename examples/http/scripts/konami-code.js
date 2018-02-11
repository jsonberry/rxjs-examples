import { dqs } from './util.js'

const konami = Rx.Observable.from([
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'KeyB',
        'KeyA',
])

const result = dqs('#konami')

Rx.Observable.fromEvent(window, 'keyup')
        .map(ev => ev.code)
        .bufferCount(10, 1)
        .mergeMap(keys => Rx.Observable.from(keys).sequenceEqual(konami))
        .filter(bool => bool)
        .subscribe(ev => result.textContent = 'Konami!')

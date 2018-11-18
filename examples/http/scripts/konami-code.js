import { dqs } from './utils.js'
const { from, fromEvent } = rxjs
const { map, bufferCount, mergeMap, filter, sequenceEqual } = rxjs.operators

const konami = from([
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

fromEvent(window, 'keyup')
  .pipe(
    map(ev => ev.code),
    bufferCount(10, 1),
    mergeMap(keys => from(keys).pipe(sequenceEqual(konami))),
    filter(bool => bool),
  )
  .subscribe(_ => (result.textContent = 'Konami!'))

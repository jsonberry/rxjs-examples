import { dqs } from "./utils.js"
const Observable = Rx.Observable

const konami = Observable.from([
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
])

const result = dqs("#konami")

Observable.fromEvent(window, "keyup")
        .map(ev => ev.code)
        .bufferCount(10, 1)
        .mergeMap(keys => Rx.Observable.from(keys).sequenceEqual(konami))
        .filter(bool => bool)
        .subscribe(ev => (result.textContent = "Konami!"))

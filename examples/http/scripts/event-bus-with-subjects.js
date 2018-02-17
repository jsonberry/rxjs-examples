/**
 *      The thing to focus on in this example is the read$ Subject
 *      It's being used as an event bus
 *      The "mark as read" buttons are the event producers
 *
 *      Another thing to note is the use of buffer
 *      Instead of using a global variable to remember the message,
 *      Buffer is doing that for us
 */
import { dqs, dqsa, dce } from "./util.js"
const Observable = Rx.Observable
const Subject = Rx.Subject

const read$ = new Subject()

const input1 = dqs("#input1")
const btn1 = dqs("#btn1")
const inbox1 = dqs("#inbox1")
const read1 = dqs("#read1")
/**
 *      input1$ is a stream of events from an input
 *      We map the stream of input events into the keys pressed
 *      Which transforms the stream into a stream of keys
 *
 *      inputEvent----inputEvent----inputEvent
 *      ---------------- map ---------------
 *      k----e----y----p----r----e----s----s
 */
const input1$ = Observable.fromEvent(input1, "input").map(({ data }) => data)

/**
 *      Just a simple stream of button clicks, only for "button1"
 */
const btn1Clicks$ = Observable.fromEvent(btn1, "click")

/**
 *      buffer helps up capture all the keys pressed until button1 is clicked
 *
 *      Think of it as:
 *      streamOfValuesToBuffer$.buffer(bufferByThisObservableEmission$)
 */
const input1Buffer$ = input1$.buffer(btn1Clicks$)

const input2 = dqs("#input2")
const btn2 = dqs("#btn2")
const inbox2 = dqs("#inbox2")
const read2 = dqs("#read2")
const input2$ = Observable.fromEvent(input2, "input").map(({ data }) => data)
const btn2Clicks$ = Observable.fromEvent(btn2, "click")
const input2Buffer$ = input2$.buffer(btn2Clicks$)

input1Buffer$.subscribe(params => {
        input1.value = ""

        const messageId = new Date().toISOString()
        const container = dce("div")
        const message = dce("p")
        const btn = dce("button")
        Observable.fromEvent(btn, "click")
                .first()
                .subscribe(ev => read$.next(messageId))

        container.style.border = "1px solid red"
        container.style.padding = "1rem"
        container.style.display = "flex"
        container.dataset.messageId = messageId
        message.textContent = params.join("")
        btn.textContent = "mark as read"

        container.appendChild(message)
        const containerClone = container.cloneNode(true)
        container.appendChild(btn)
        inbox2.appendChild(container)
        read1.appendChild(containerClone)
})

input2Buffer$.subscribe(params => {
        input2.value = ""

        const messageId = new Date().toISOString()
        const container = dce("div")
        const message = dce("p")
        const btn = dce("button")
        Observable.fromEvent(btn, "click")
                .first()
                .subscribe(ev => read$.next(messageId))

        container.style.border = "1px solid red"
        container.style.padding = "1rem"
        container.style.display = "flex"
        container.dataset.messageId = messageId
        message.textContent = params.join("")
        btn.textContent = "mark as read"

        container.appendChild(message)
        const containerClone = container.cloneNode(true)
        container.appendChild(btn)
        inbox1.appendChild(container)
        read2.appendChild(containerClone)
})

Observable.fromEvent(dqs("#clear"), "click").subscribe(() => {
        inbox1.innerHTML = ""
        inbox2.innerHTML = ""
        read1.innerHTML = ""
        read2.innerHTML = ""
})

/**
 *      Because read$ is a Subject, it can act as an event bus
 *      We can create event producers and each of them can
 *      Send a new message to the event bus whenever we choose
 */
read$.map(id => dqsa(`[data-message-id="${id}"]`)).subscribe(nodeList => {
        nodeList.forEach(params => {
                params.style.border = ""
        })
})

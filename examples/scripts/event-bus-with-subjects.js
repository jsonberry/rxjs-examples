const read$ = new Rx.Subject()
const clearAll$ = new Rx.Subject()
import { dqs, dqsa, dce } from './util.js';

const input1 = dqs('#input1')
const btn1 = dqs('#btn1')
const inbox1 = dqs('#inbox1')
const read1 = dqs('#read1')
const input1$ = Rx.Observable.fromEvent(input1, 'input').map(({ data }) => data)
const btn1Clicks$ = Rx.Observable.fromEvent(btn1, 'click')
const input1Buffer$ = input1$.buffer(btn1Clicks$)

const input2 = dqs('#input2')
const btn2 = dqs('#btn2')
const inbox2 = dqs('#inbox2')
const read2 = dqs('#read2')
const input2$ = Rx.Observable.fromEvent(input2, 'input').map(({ data }) => data)
const btn2Clicks$ = Rx.Observable.fromEvent(btn2, 'click')
const input2Buffer$ = input2$.buffer(btn2Clicks$)


input1Buffer$.subscribe(params => {
        input1.value = ''

        const messageId = (new Date).toISOString()
        const container = dce('div')
        container.style.border = '1px solid red'
        container.style.padding = '1rem'
        container.style.display = 'flex'
        container.dataset.messageId = messageId
        const message = dce('p')
        message.textContent = params.join('')
        const btn = dce('button')
        btn.addEventListener('click', () => read$.next(messageId))
        btn.textContent = 'mark as read'

        container.appendChild(message)
        const containerClone = container.cloneNode(true)
        container.appendChild(btn)
        inbox2.appendChild(container)
        read1.appendChild(containerClone)
})

input2Buffer$.subscribe(params => {
        input2.value = ''

        const messageId = (new Date).toISOString()
        const container = dce('div')
        container.style.border = '1px solid red'
        container.style.padding = '1rem'
        container.style.display = 'flex'
        container.dataset.messageId = messageId
        const message = dce('p')
        message.textContent = params.join('')
        const btn = dce('button')
        btn.addEventListener('click', () => read$.next(messageId))
        btn.textContent = 'mark as read'

        container.appendChild(message)
        const containerClone = container.cloneNode(true)
        container.appendChild(btn)
        inbox1.appendChild(container)
        read2.appendChild(containerClone)
})

clearAll$.subscribe(
    () => {
        inbox1.innerHTML = ''
        inbox2.innerHTML = ''
        read1.innerHTML = ''
        read2.innerHTML = ''
    }
)

read$
    .map(id => dqsa(`[data-message-id="${id}"]`))
    .subscribe(nodeList => {
        nodeList.forEach((params) => {
            params.style.border = ''
        })
    })
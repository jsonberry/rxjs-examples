import {dqs} from './utils.js';

const {Observable, fromEvent, pipe, empty} = rxjs;
const {ajax} = rxjs.ajax;
const {switchMap, map, scan, filter, tap} = rxjs.operators;

const input = dqs('input');
const results = dqs('#results');

fromEvent(input, 'input')
    .pipe(
        // filter(x => !!x.target.value),
        tap(x => x.target.value),
        switchMap(x => {
            return ajax.getJSON(
                `https://api.duckduckgo.com/?q=${encodeURIComponent(
                    x.target.value,
                )}&format=json&pretty=1`,
            );
        }),
    )
    .subscribe((params) => {
        console.log(params);
    });

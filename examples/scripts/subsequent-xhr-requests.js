/**
 *      This will get all posts from a default WordPress REST API
 *      First we see how many pages there are
 *      Then we make subsequent XHR requests (via Axios)
 *      That paginate through every page of posts
 */
const axios = require('axios')

const { Observable } = require('rxjs')
const { switchMap, concatMap } = require('rxjs/operators')
const { from, range } = require('rxjs/create')

const endpoint = 'http://demo.wp-api.org/wp-json/wp/v2/posts'

const posts$ = Observable.from(axios.get(endpoint))
        .switchMap(({ headers }) =>
                Observable.range(1, Number(headers['x-wp-totalpages'])),
        )
        .concatMap(page =>
                Observable.from(
                        axios.get(endpoint, {
                                params: {
                                        page,
                                },
                        }),
                ),
        )
        .subscribe(
                ({ data }) => console.log(data.length), 
                err => console.log('Oh no, an error!', err),
        )

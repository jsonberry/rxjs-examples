/**
 *      This will get all posts from a default WordPress REST API
 *      First we see how many pages there are
 *      Then we make subsequent XHR requests (via Axios)
 *      That paginate through every page of posts
 */
const axios = require('axios')

const { Observable, from, range } = require('rxjs')
const { switchMap, concatMap } = require('rxjs/operators')

const endpoint = 'http://demo.wp-api.org/wp-json/wp/v2/posts'

/**
 *      This sets up the initial request and the Observable stream
 *      In the return from the endpoint, the Axios request headers will have x-wp-totalpages,
 *      which gives us... the total pages of posts ;)
 */
const posts$ = Observable.from(axios.get(endpoint))
        /**
         *     We now know the total number of pages,
         *     so we'll switch to a new Observable that is just a range of numbers
         *     We'll start with 1, and end with whatever the total number of pages is
         *     This gives us a stream of 1--n--n--n... (example: 1, 2, 3, 4...)
         */
        .switchMap((
                { headers }, // using ES6 function header destructuring and arrow functions here
        ) => Observable.range(1, Number(headers['x-wp-totalpages'])))
        /**
         *     We can now paginate through all posts, getting 10/page
         *     concatMap will fire off a request, waits until it completes, and then fire the next one
         *     In each subsequent firing, we ask for the next page of posts
         */
        .concatMap(page =>
                axios.get(endpoint, {
                        params: {
                                page,
                        },
                }),
        )
        .subscribe(
                // data here is an Array of WordPress Posts, tacking .length shows us how many per page we are getting
                ({ data }) => console.log(data.length),
                err => console.log('Oh no, an error!', err),
        )

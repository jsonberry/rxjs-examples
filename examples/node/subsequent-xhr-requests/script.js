/**
 *      This will get all posts from a default WordPress REST API
 *      First we see how many pages there are
 *      Then we make subsequent XHR requests (via Axios)
 *      That paginate through every page of posts
 */
const axios = require('axios')

const { from, range, of } = require('rxjs')
const {
  switchMap,
  concatMap,
  map,
  pluck,
  tap,
  delay,
  catchError,
  reduce,
} = require('rxjs/operators')

const endpoint = 'https://ey-intuitive.com/wp-json/wp/v2/posts'

/**
 *      This sets up the initial request and the Observable stream
 *      In the return from the endpoint, the Axios request headers will have x-wp-totalpages,
 *      which gives us... the total pages of posts ;)
 */
from(axios.get(endpoint))
  .pipe(
    /**
     *     We now know the total number of pages,
     *     so we'll switch to a new Observable that is just a range of numbers
     *     We'll start with 1, and end with whatever the total number of pages is
     *     This gives us a stream of 1--n--n--n... (example: 1, 2, 3, 4...)
     */
    switchMap((
      { headers }, // using ES6 function header destructuring and arrow functions here
    ) => range(1, Number(headers['x-wp-totalpages']))),
    /**
     *     We can now paginate through all posts, getting 10/page
     *     concatMap will fire off a request, waits until it completes, and then fire the next one
     *     In each subsequent firing, we ask for the next page of posts
     */
    concatMap((
      page, // We're now serially going through each page of paginated data
    ) =>
      from(
        axios.get(endpoint, {
          // creating an Observable from the pagniated data
          params: {
            page,
          },
        }),
      ).pipe(
        // Axios gives us data in the "data" prop of the return from a GET, so pluck that out
        pluck('data'),
        // "data" here is an Array of posts, so we flatten out the array with another concatMap - think of this as doing a "forEach" on an Array of posts
        concatMap(data => data),
        // tap(x => console.log(x)),
        // think of this as inside of the "forEach" over posts, and we want to control how quickly each signal of post data emitted, so we delay _each_ post emission
        // this is a very simple example of how to deal with Back Pressure in RxJS - there are other techniques available through operators like `buffer` and `window`
        // concatMap(post => of(post).pipe(delay(1000))),
        catchError(error => error),
      ),
    ),
    map(post => ({
      id: post.id,
      link: post.link,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
    })),
    reduce((acc, val) => ({ ...acc, [val.id]: val })),
  )
  .subscribe(
    // Here are all of the WordPress Posts, one at a time, with a delay in between the log
    data => console.log(JSON.stringify(data, null, 2)),
    err => console.log('Oh no, an error!', err),
  )

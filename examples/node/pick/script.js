const { of } = require('rxjs')
const { pick } = require('rxjs-toolkit')

/**
 * Pick is a customer operator that is using Lodash pick under the hood
 */
of({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
})
  .pipe(pick('foo', 'baz'))
  .subscribe(x => console.log(x))

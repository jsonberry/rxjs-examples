const { of } = require('rxjs')
const { pick } = require('rxjs-toolkit')

of({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
}).pipe(
  pick('foo', 'baz'),
).subscribe(x => console.log(x))

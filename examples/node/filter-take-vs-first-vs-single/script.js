const { from } = require('rxjs')
const { take, first, single, filter } = require('rxjs/operators')
const { observer } = require('../utils')

const foo = from([1, 2, 3, 4, 5])
const predicate = x => x > 4

foo
  .pipe(
    filter(predicate),
    take(1),
  )
  .subscribe(observer('filter, take(1)'))

foo.pipe(first()).subscribe(observer('first, no predicate'))

foo.pipe(first(predicate)).subscribe(observer('first with a predicate'))

foo.pipe(single(predicate)).subscribe(observer('single with a predicate'))

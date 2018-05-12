# Test Cases
```javascript
const stream$ = from([1, 2, 3, 4, 5])

stream$
    .pipe(
        filter(predicate),
        take(1),
    )
    .subscribe(observer('filter, take(1)'))


stream$
    .pipe(
        first(),
    )
    .subscribe(observer('first, no predicate'))


stream$
    .pipe(
        first(predicate),
    )
    .subscribe(observer('first with a predicate'))

stream$
    .pipe(
        single(predicate),
    )
    .subscribe(observer('single with a predicate'))
```

# One element passes the predicate
```javascript
const predicate = x => x > 4
```

```bash
filter, take(1) [ next ] 5
filter, take(1) [ done ]
first, no predicate [ next ] 1
first, no predicate [ done ]
first with a predicate [ next ] 5
first with a predicate [ done ]
single with a predicate [ next ] 5
single with a predicate [ done ]
```


# No elements pass predicate
```javascript
const predicate = x => x > 4
```

```bash
filter, take(1) [ done ]
first, no predicate [ next ] 1
first, no predicate [ done ]
first with a predicate [ err ] EmptyError: no elements in sequence
single with a predicate [ next ] undefined
single with a predicate [ done ]
```
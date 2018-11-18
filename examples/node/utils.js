module.exports.observer = id => ({
    next: val => console.log(`${id} [ next ] ${val}`),
    error: err => console.log(`${id} [ error ] ${err}`),
    complete: () => console.log(`${id} [ complete ]`),
})

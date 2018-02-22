module.exports.observer = id => ({
    next: val => console.log(`${id} [ next ] ${val}`),
    error: err => console.log(`${id} [ err ] ${err}`),
    complete: () => console.log(`${id} [ done ]`),
})

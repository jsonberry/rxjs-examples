export const dqs = selector => document.querySelector(selector)
export const dqsa = selector => document.querySelectorAll(selector)
export const dce = el => document.createElement(el)

export const observer = id => ({
  next: val => console.log(`${id} [ next ] ${val}`),
  error: err => console.log(`${id} [ err ] ${err}`),
  complete: () => console.log(`${id} [ done ]`),
})
const limitTry = require('../libs/limitTry')

function functionName() {
  if (Math.random() > 0.5) {
    throw new Error('This is Error')
  }

  return 'ok'
}

const functionNameLimit = limitTry(functionName, 3)

// setInterval(() => {
//   console.log(functionNameLimit())
// }, 500)


function alwaysFailFunctionProm(index) {
  return new Promise(function(resolve, reject) {
    reject(new Error(`Error Wow`))
  })
}
const alwaysFailFunctionPromLimit = limitTry(alwaysFailFunctionProm, 4, {
  promise: true
})

alwaysFailFunctionPromLimit().then(console.log)

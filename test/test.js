const assert = require('assert')
const { expect } = require('chai')
const limitTry = require('../libs/limitTry')

function alwaysSuccessFunction() {
  return 'success'
}
const alwaysSuccessFunctionLimit = limitTry(alwaysSuccessFunction, 1)
const alwaysSuccessFunctionLimitAutoTry = limitTry(alwaysSuccessFunction, 1, { autoTry: true })

function alwaysFailFunction(index) {
  throw new Error(`Error Wow`)
}
const alwaysFailFunctionLimit = limitTry(alwaysFailFunction, 4)
const alwaysFailFunctionLimitAutoTry = limitTry(alwaysFailFunction, 4, { autoTry: true })


describe(`Sync function 'limitTry'`, function() {
  describe('alwaysSuccessFunction', function() {
    for (let i = 0; i < 4; i++) {
      it(`should return 'success' ${i} `, function() {
        assert.equal(alwaysSuccessFunctionLimit(), 'success')
      })
    }
  })

  describe('alwaysFailFunction', function() {
    for (let i = 0; i < 3; i++) {
      it(`should return self ${i} `, function() {
        expect(alwaysFailFunctionLimit()).to.equal(alwaysFailFunctionLimit)
      })
    }

    it(`should throw exeption`, function() {
      expect(alwaysFailFunctionLimit).to.throw('Error Wow')
    })
  })

  describe('alwaysSuccessFunctionLimitAutoTry', function() {
    it(`should return 'success'`, function() {
      assert.equal(alwaysSuccessFunctionLimit(), 'success')
    })
  })

  describe('alwaysFailFunctionLimitAutoTry', function() {
    it(`should throw exeption`, function() {
      expect(alwaysFailFunctionLimitAutoTry).to.throw('Error Wow')
    })
  })

})


function alwaysSuccessFunctionProm() {
  return new Promise(function(resolve, reject) {
    resolve('success')
  })
}

const alwaysSuccessFunctionPromLimit = limitTry(alwaysSuccessFunctionProm, 1, {
  promise: true
})
const alwaysSuccessFunctionPromLimitAutoTry = limitTry(alwaysSuccessFunctionProm, 1, {
  promise: true,
  autoTry: true
})

function alwaysFailFunctionProm(index) {
  return new Promise(function(resolve, reject) {
    reject(new Error(`Error Wow`))
  })
}
const alwaysFailFunctionPromLimit = limitTry(alwaysFailFunctionProm, 4, {
  promise: true
})
const alwaysFailFunctionPromLimitAutoTry = limitTry(alwaysFailFunctionProm, 4, {
  promise: true,
    autoTry: true
})



describe(`Promises function 'limitTry'`, function() {
  describe('alwaysSuccessFunctionPromLimit', function() {
    for (let i = 0; i < 4; i++) {
      it(`should return 'success' ${i} `, async function() {
        return alwaysSuccessFunctionPromLimit().then(res => {
          expect(res).to.equal('success')
        })
      })
    }
  })

  describe('alwaysFailFunctionPromLimit', function() {
    for (let i = 0; i < 3; i++) {
      it(`should return undefined ${i} `, function() {
        return alwaysFailFunctionPromLimit().then(res => {
          expect(res).to.equal(alwaysFailFunctionPromLimit)
        }, res => {
          expect(res).to.equal(alwaysFailFunctionPromLimit)
        })
      })
    }

    it(`should throw exeption`, async function() {
      return alwaysFailFunctionPromLimit().then(err => {
        expect(() => {throw err}).to.throw('Error Wow')
      }, err => {
        expect(() => {throw err}).to.throw('Error Wow')
      })
    })
  })

  describe('alwaysSuccessFunctionPromLimitAutoTry', function() {
    it(`should return 'success'`, function() {
      return alwaysSuccessFunctionPromLimitAutoTry().then(res => {
        expect(res).to.equal('success')
      })
    })
  })

  describe('alwaysFailFunctionLimitAutoTry', function() {
    it(`should throw exeption`, function() {
      return alwaysFailFunctionPromLimitAutoTry().then(err => {
        expect(() => {throw err}).to.throw('Error Wow')
      }, err => {
        expect(() => {throw err}).to.throw('Error Wow')
      })
    })
  })

})

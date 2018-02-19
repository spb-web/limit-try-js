/**
 * @function limitTry
 * @version 0.0.5
 *
 * @param {Function} func Оборачиваемая функция
 * @param {Integer} limit Количество попыток выполнения функции
 * @param {Object} options Опции
 * @param {Boolean} options.autoTry По умолчанию true. Если значение true - при ошибки функция будет вызываться рекурсивно пока не выполнится успешно или не закончится число попыток
 * @param {Boolean} options.promise Если оборачиваемая функция аснхронна, установите этот параметр как true для коректной работы
 * @param {Function} options.errorHandler
 *
 * @throws Выбрасывает исключение если привышено число попыток выполнение функции
 *
 * @return {Function}
 *
 * @example
 * const limitTry = require('limit-try-js')
 *
 * function functionName() {
 *   if (Math.random() > 0.5) {
 *     throw new Error('This is Error')
 *   }
 *
 *   return 'ok'
 * }
 *
 * const functionNameLimit = limitTry(functionName, 100)
 *
 * console.log(functionNameLimit()) // ok
 */
function limitTry(func, limit = 1, options = {}) {
  const wrapperFunc = function(...args) {
    try {
      const funcResult = func(...args)

      if (wrapperFunc.options.promise) {
        return funcResult.catch(err => {
          return wrapperFunc.options.errorHandler(err).then(() => {
            return wrapperFunc(...args)
          }, err => {
            return errorHandler(err, wrapperFunc, args)
          })
        }).catch(err => {
          return errorHandler(err, wrapperFunc, args)
        })
      }

      return funcResult
    } catch (err) {
      try {
        wrapperFunc.options.errorHandler(err)

        return wrapperFunc(...args)
      } catch (err) {
        return errorHandler(err, wrapperFunc, args)
      }
    }
  }

  wrapperFunc.limit = limit
  wrapperFunc.current = 0
  wrapperFunc.options = { ...defaultOptions, ...options }

  return wrapperFunc
}

/**
 * @private
 */
function errorHandler(err, wrapperFunc, args) {
  if (wrapperFunc.limit <= ++wrapperFunc.current) {
    // throw error

    throw err
  } else {
    if (wrapperFunc.options.autoTry) {
      return wrapperFunc(...args)
    }
  }

  return wrapperFunc
}

/**
 * @const {Object} defaultOptions Опции по умолчанию
 * @private
 * @property {Boolean} autoTry По умолчанию false. Если значение true - при ошибки функция будет вызываться рекурсивно пока не выполнится успешно или не закончится число попыток
 * @property {Boolean} promise Если оборачиваемая функция аснхронна, установите этот параметр как true для коректной работы
 * @property {Function} errorHandler
 */
const defaultOptions = {
  autoTry: true,
  promise: false,
  errorHandler: err => { throw err }
}


module.exports = limitTry

/**
 * @function limitTry
 *
 * @param {Function} func Оборачиваемая функция
 * @param {Integer} limit Количество попыток выполнения функции
 * @param {Object} options Опции
 * @param {Boolean} options.autoTry По умолчанию false. Если значение true - при ошибки функция будет вызываться рекурсивно пока не выполнится успешно или не закончится число попыток
 * @param {Boolean} options.promise Если оборачиваемая функция аснхронна, установите этот параметр как true для коректной работы
 *
 * @example
 *
 * function functionName() {
 *   if (Math.random() > 0.5) {
 *     throw new Error('This is Error')
 *   }
 *
 *   return 'ok'
 * }
 *
 * const functionNameLimit = limitTry(functionName, 3, { autoTry: true })
 *
 * console.log(functionNameLimit())
 *
 * @return {Function}
 */
function limitTry(func, limit = 1, options = {}) {
  const wrapperFunc = function(...args) {
    try {
      const funcResult = func(...args)

      if (wrapperFunc.options.promise) {
        return funcResult.catch(err => {
          return errorHandler(err, wrapperFunc, args)
        })
      }

      return funcResult
    } catch (err) {
      return errorHandler(err, wrapperFunc, args)
    }
  }

  wrapperFunc.limit = limit
  wrapperFunc.current = 0
  wrapperFunc.options = {
    autoTry: defaultOptions.autoTry,
    promise: defaultOptions.promise
  } = options

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
 */
const defaultOptions = {
  autoTry: false,
  promise: false
}


module.exports = limitTry

# limit-try-js
Позволяет создать обертку над функцией, которая при выбрасывание функцией
исключения пытается выполнить эту функцию вновь пока выполнение не завершиться
успешно или не будет превышено число попыток выполнения функции.

## Install
```
npm install limit-try-js --save
```
Or
```
yarn add limit-try-js
```

## Testing
```
npm test
```
Or
```
yarn test
```

<a name="limitTry"></a>

## limitTry(func, limit, options) ⇒ <code>function</code>
**Kind**: global function  
**Throws**:

- Выбрасывает исключение если привышено число попыток выполнение функции

**Version**: 0.0.5  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Оборачиваемая функция |
| limit | <code>Integer</code> | Количество попыток выполнения функции |
| options | <code>Object</code> | Опции |
| options.autoTry | <code>Boolean</code> | По умолчанию true. Если значение true - при ошибки функция будет вызываться рекурсивно пока не выполнится успешно или не закончится число попыток |
| options.promise | <code>Boolean</code> | Если оборачиваемая функция аснхронна, установите этот параметр как true для коректной работы |
| options.errorHandler | <code>function</code> |  |

**Example**  
```js
const limitTry = require('limit-try-js')

function functionName() {
  if (Math.random() > 0.5) {
    throw new Error('This is Error')
  }

  return 'ok'
}

const functionNameLimit = limitTry(functionName, 100)

console.log(functionNameLimit()) // ok
```

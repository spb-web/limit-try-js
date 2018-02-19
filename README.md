# limit-try
Позволяет создать обертку над функцией для. лень писать)

<a name="limitTry"></a>

## limitTry(func, limit, options) ⇒ <code>function</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Оборачиваемая функция |
| limit | <code>Integer</code> | Количество попыток выполнения функции |
| options | <code>Object</code> | Опции |
| options.autoTry | <code>Boolean</code> | По умолчанию false. Если значение true - при ошибки функция будет вызываться рекурсивно пока не выполнится успешно или не закончится число попыток |
| options.promise | <code>Boolean</code> | Если оборачиваемая функция аснхронна, установите этот параметр как true для коректной работы |

**Example**  
```js
function functionName() {
  if (Math.random() > 0.5) {
  throw new Error('This is Error')
  }

  return 'ok'
}

const functionNameLimit = limitTry(functionName, 3)

console.log(functionNameLimit())
```

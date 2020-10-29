# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         |
| ----------------- | ------------------------------- |
| Case Styles       | camelCase                       |
| Acronym Case      | iBm                             |
| Indentation Style | OneTrueBraceStyle               |
| Indentation       | Tabs                            |
| Indentation Space | 4 spaces                        |
| Semicolon         | Mandatory                       |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example
1.
```js
var { categoryID } = query;

var { categoryID = 1 } = query;

var { categoryID: categoryID } = query;
```
2.
```js
import { camelCase } from 'mod';
```

3.
```js 
var camelCase = 1;
var FAKE_CONSTANT = 2;
var obj = {
    notGood: 3
};
```
4. (Good Indendation)
```js
function foo() {
  let x = 2;
  console.log(x);
}

function bar() {
  console.log(1);
}
```
5. (Good Line Formatting)
```js 
function foo() {
  let x = 2;
  console.log(x);
}

function bar() {
  let y = 1;
  console.log(y);
}
```
6. (Good Spacing)
```js
let x = (a + b) * c / d + foo();
```

### Bad Example
1.
```js
var { Category_id: Category_alias } = query;

var { Category_id, ...Other_props } = query;
```
2.
```js
import Defaultimport from 'mod';

import * as Namespacedimport from 'mod';
```
3. (No semicolon, case style and Acronym Case did not apply,)
```js
var camel_case = 1
var Fakeconstant = 2
var Obj = {
    notgood: 3
};
```
4. (Bad Indentation)
```js
function foo() {
let x = 2;
console.log(x);
}

  function bar() {
console.log(1);
  }
```

5. (Bad line formating)
```js
function foo() { let x = 2; console.log(x);}

function bar()
{
  let y = 1;
  console.log(y);
}
```

6. (Bad Spacing)
```js
let x=(a+b)*c/d+foo();
```
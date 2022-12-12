# JavaScript

## Index

- [JavaScript](#javascript)
  - [Index](#index)
  - [1. Useful general knowledge](#1-useful-general-knowledge)
    - [finding prime numbers](#finding-prime-numbers)
    - [Fibonacci with performance](#fibonacci-with-performance)
    - [charCode (ASCII)](#charcode-ascii)
    - [nullish coalescing operator](#nullish-coalescing-operator)
    - [slice](#slice)
    - [Short-circuiting](#short-circuiting)
  - [2. Objects](#2-objects)
    - [Copying objects](#copying-objects)
    - [Object vectors](#object-vectors)
    - [Destructuring assignment](#destructuring-assignment)
    - [Rest operator](#rest-operator)
    - [Optional chaining](#optional-chaining)
  - [3. Functions](#3-functions)
    - [Vanilla function (hoisting)](#vanilla-function-hoisting)
    - [Arrow function](#arrow-function)
    - [Variable scope](#variable-scope)
    - [Object function](#object-function)
  - [4. Loops](#4-loops)
    - [for](#for)
    - [while](#while)
    - [do/while](#dowhile)
    - [for/of](#forof)
    - [for/in](#forin)
  - [5. Mutability](#5-mutability)
  - [6. Array methods](#6-array-methods)
    - [filter](#filter)
    - [map](#map)
    - [reduce](#reduce)
    - [every](#every)
    - [some](#some)
    - [find](#find)
    - [findIndex](#findindex)
    - [filter + map + reduce](#filter--map--reduce)
    - [splice](#splice)
    - [forEach](#foreach)
  - [7. Classes](#7-classes)
    - [constructor](#constructor)
    - [static and instance methods](#static-and-instance-methods)
  - [8. Promises](#8-promises)
    - [Standard](#standard)
    - [Promise.all](#promiseall)
    - [Promise.race](#promiserace)
    - [async/await](#asyncawait)
  - [9. console](#9-console)
    - [log](#log)
    - [warn](#warn)
    - [error](#error)
  - [10. fetch](#10-fetch)
    - [XMLHttpRequest](#xmlhttprequest)
    - [fetchAPI](#fetchapi)
    - [fetchAPI with options](#fetchapi-with-options)
    - [axios](#axios)

## 1. Useful general knowledge

### finding prime numbers

~~~js
const isPrime = (number) => {
  let output = number > 1;
  let index = 2;
  while (index < number && output) {
    output = number % index === 0;
    index += 1;
  }
  return output;
};
~~~

### Fibonacci with performance

~~~js
const fib = (n) => {
  let [prev, curr] = [-1, 1];

  for(let i = 0; i < n; i++){
    const sum = prev + curr;
    prev = curr;
    curr = sum;
  }

  return curr;
};
~~~

### charCode (ASCII)

Identify charCode from a char inside a string

~~~js
const string = 'Javascript';
const charJCode = string.charCodeAt(0); // 74
~~~

Identify char from a charCode

~~~js
const charCode = 74;
const char = String.fromCharCode(charCode); // 'J'
~~~

> - Capital letters go from 65 to 90
> - Lowercase letters go from 97 to 122
> - Numbers go from 48 to 57

### nullish coalescing operator

When you want to consider falsy values, such as `0`, as a valid value.

~~~js
const baz = 0 || 42; // 0 is falsy, so 42 is returned
const baz = 0 ?? 42; // 0 is not nullish, so 0 is returned
~~~

### slice

~~~js
const arr = [1, 2, 3, 4, 5];
const firstIncludedIndex = 1;
const firstExcludedIndex = 3; // default is arr.length
const sliced = arr.slice(firstIncludedIndex, firstExcludedIndex);

//or

const str = '12345';
const sliced = str.slice(1, 3); // '23'
~~~

### Short-circuiting

~~~js
// Short-circuiting with logical AND (&&)

const circuit1 = 0 && 42; // 0

// Whatever you compare with 0, && will return 0

const curcuit2 = 42 && 0; // 0

// Short-circuiting with logical OR (||)

const circuit3 = 0 || 42; // 42

//function

const funcA = () => false;
const funcB = () => 42;
const circuit4 = funcA() || funcB(); // 42
const circuit5 = funcA() && funcB(); // false
~~~

## 2. Objects

### Copying objects

A `shallow copy` only goes one level deep. If you want to copy the whole object, make a `deep clone`.

~~~js
const obj = { a: 1, b: 2 };
const assignShallowCopy = Object.assign({}, obj);
const spreadShallowCopy = { ...obj };
const deepClone = JSON.parse(JSON.stringify(obj));
~~~

### Object vectors

~~~js
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj); // ['a', 'b']
const values = Object.values(obj); // [1, 2]
const entries = Object.entries(obj); // [['a', 1], ['b', 2]]
~~~

### Destructuring assignment

You can rename the keys (`:`) and set default values (`=`).

~~~js
const obj = { key: 'value' };
const { key: renamedKey = 'defaultValue' } = obj;
~~~

### Rest operator

Works with arrays and objects.

~~~js
const [a,, ...rest] = [1, 2, 3, 4, 5];
console.log([a, ...rest]); // [1, 3, 4, 5]
~~~

### Optional chaining

You can use `?.` to check if a property exists before accessing its nested properties.

~~~js
const obj = { a: { b: 1 } };
const value = obj?.a?.b ?? 'Non-existent'; // 1
~~~

You may only call functions if they exist.

~~~js
const obj = { a: { myFunc: () => 1 } };
const value = obj?.a?.myFunc?.() ?? 'Non-existent'; // 1
~~~

## 3. Functions

### Vanilla function (hoisting)

~~~js
x();
function x() {}
~~~

### Arrow function

~~~js
const x = () => {};
~~~

### Variable scope

~~~js
const x = function() {};
~~~

### Object function

~~~js
const obj = {
  x: function() {}
};

//or

const obj = {
  x() {}
};

//or

const obj = {
  x: () => {}
};
~~~

## 4. Loops

### for

Best used when you know the exact number of iterations

~~~js
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
~~~

### while

Best used when you don't know the exact number of iterations and want to check a condition before each iteration

~~~js
const arr = [1, 2, 3];
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
~~~

### do/while

Best used when you want to do something and then check if you should continue

~~~js
const arr = [1, 2, 3];
let i = 0;
do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);
~~~

### for/of

Best used when you want to iterate over the values of an array, map, set or string

~~~js
const arr = [1, 2, 3];
for (const value of arr) {
  console.log(value);
}

//or

const map = new Map([['key', 'value']]);
for (const [key, value] of map) {
  console.log(key, value);
}
~~~

### for/in

Best used when you want to loop through an object's keys

~~~js
const obj = {a: 1, b: 2, c: 3}
for (const key in obj) {
  console.log(`obj.${key} = ${obj[key]}`)
}
~~~

## 5. Mutability

- **Doesnt' mutate:**
  - concat (concatenates arrays)
  - entries (creates an array with the key/value pairs)
  - every (returns true if all elements pass the condition)
  - filter (creates a new array with the elements that pass the condition)
  - find (returns the first element that passes the condition)
  - findIndex (returns the index of the first element that satisfies the condition)
  - flat (creates a new array with all sub-array elements concatenated into it recursively up to the specified depth)
  - forEach (executes a provided function once for each array element)
  - includes (returns true if the array contains the element)
  - indexOf (returns the first index at which a given element can be found in the array, or -1 if it is not present)
  - join (creates and returns a new string by concatenating all of the elements in an array)
  - keys (creates an array with the keys)
  - lastIndexOf (returns the last index at which a given element can be found in the array, or -1 if it is not present)
  - map (creates a new array with the results of calling a provided function on every element in the calling array)
  - reduce (executes a reducer function (that you provide) on each element of the array, resulting in a single output value)
  - reduceRight (reduce from right to left)
  - slice (creates a new array with a shallow copy of a portion of the array)
  - some (returns true if at least one element passes the condition)
  - toLocaleString (returns a string representing the elements of the array)
  - toSource (returns the array as a string)
  - toString (returns a string representing the elements of the array)
  - values (creates an array with the values)

- **Mutates:**
  - copyWithin (copies a sequence of array elements within the array)
  - fill (fills all the elements of an array from a start index to an end index with a static value)
  - reverse (reverses an array in place)
  - pop (removes the last element from an array and returns that element)
  - push (adds one or more elements to the end of an array and returns the new length of the array)
  - shift (removes the first element from an array and returns that element)
  - unshift (adds one or more elements to the beginning of an array and returns the new length of the array)
  - splice (changes the content of an array by removing existing elements and/or adding new elements)
  - sort (sorts the elements of an array in place and returns the array)

## 6. Array methods

Every array method has in its signature a callback function that receives the current element, the current index and the array itself.

~~~js
// Example:
const arr = [1, 2, 3];
arr.forEach((element, index, array) => {
  console.log(element, index, array);
});
// 1 0 [1, 2, 3]
// 2 1 [1, 2, 3]
// 3 2 [1, 2, 3]
~~~

### filter

~~~js
const arr = [1, 2, 3, 4, 5];
const filtered = arr.filter(item => item > 2); // [3, 4, 5]
~~~

### map

~~~js
const arr = [1, 2, 3];
const mapped = arr.map(item => item * 2); // [2, 4, 6]
~~~

> **Map or Object:** When you have a predefined set of keys, use an object, otherwise use a map.

~~~js
const map = new Map();
map.set('key', 'value');
map.get('key'); // 'value'
~~~

### reduce

~~~js
// sum of all elements

const arr = [1, 2, 3, 4, 5];
const initialValue = 0; // optional
const reduced = arr.reduce((accumulator, item) => accumulator + item, initialValue); // 15

// get the biggest number

const reduced = arr.reduce((acc, item) => acc > item ? acc : item); // 5
~~~

### every

~~~js
const arr = [1, 2, 3, 4, 5];
const every = arr.every(item => item > 0); // true
~~~

### some

~~~js
const arr = [1, 2, 3, 4, 5];
const some = arr.some(item => item > 4); // true
~~~

### find

~~~js
const arr = [1, 2, 3, 4, 5];
const found = arr.find(item => item > 4); // 5
~~~

### findIndex

~~~js
const arr = [1, 2, 3, 4, 5];
const foundIndex = arr.findIndex(item => item > 4); // 4
~~~

### filter + map + reduce

~~~js
const output = [1, 2, 3, 4, 5]
  .filter(item => item % 2 === 0)
  .map(item => item * 2)
  .reduce((acc, item) => acc + item); // 12
~~~

### splice

~~~js
const arr = [1, 2, 3, 4, 5];
const indexToStart = 1;
const numberOfItemsToDelete = 2;
const itemsToAdd = [6, 7];
const spliced = arr.splice(indexToStart, numberOfItemsToDelete, ...itemsToAdd); // [2, 3]
console.log(arr); // [1, 6, 7, 4, 5]
~~~

### forEach

~~~js
const arr = [1, 2, 3, 4, 5];
const forEachCallback = (item, index, array) => console.log(item);
arr.forEach(forEachCallback);
~~~

## 7. Classes

### constructor

~~~js
class Person {
  constructor(name) {
    this.name = name;
  }
}
person = new Person('John');
console.log(person.name); // John
~~~

### static and instance methods

~~~js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayGoodbye() {
    console.log('Goodbye');
  }
  static sayHello() {
    console.log('Hello');
  }
}

Person.sayHello(); // Hello
Person.sayGoodbye(); // TypeError: Person.sayGoodbye is not a function

const p1 = new Person('John');
p1.sayHello(); // TypeError: person.sayHello is not a function
p1.sayGoodbye(); // Goodbye
~~~

## 8. Promises

### Standard

~~~js
const promise = (msg) => {
  new Promise((resolve, reject) => {
    if (msg === 'resolve') {
      resolve('resolved');
    } else {
      reject('rejected');
    }
  });
}

promise('resolve')
  .then((msg) => {
    console.log(msg); // resolved
    return promise('resolve');
  })
  .then((msg) => {
    console.log(msg); // resolved
    return promise('reject');
  })
  .catch((msg) => {
    console.log(msg); // rejected
  });
~~~

### Promise.all

~~~js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1');
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2');
  }, 2000);
});

Promise.all([promise1, promise2])
  .then((msg) => {
    console.log(msg); // ['promise1', 'promise2']
  })
  .catch((msg) => {
    console.log(msg);
  });
~~~

> If one of the promises is rejected, the catch is called and the other promises are not returned

### Promise.race

Returns the first promise that is resolved or rejected

~~~js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1');
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2');
  }, 2000);
});

Promise.race([promise1, promise2])
  .then((msg) => {
    console.log(msg); // promise1
  })
  .catch((msg) => {
    console.log(msg);
  });
~~~

### async/await

A promise could be:

- pending
- fulfilled
- rejected

~~~js
async function handlePromise() {
  try {
    const response = await fetch('https://example-api.com/users');
    const data = await response.json();
  } catch (err) {
    console.error(err);
  }
}

handlePromise(); // { users: [ { name: 'John' } ] }
~~~

## 9. console

### log

~~~js
console.log('Standard log');
~~~

### warn

~~~js
console.warn('This will be displayed as a warning');
~~~

### error

~~~js
console.error('This will be displayed as an error');
~~~

## 10. fetch

### XMLHttpRequest

~~~js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example-api.com/users');
xhr.send();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};
~~~

### fetchAPI

~~~js
fetch('https://example-api.com/users')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// or

async function getData() {
  try {
    const response = await fetch('https://example-api.com/users');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

getData();
~~~

### fetchAPI with options

~~~js
const body = { name: 'John', age: 30 };
fetch('https://example-api.com/users', {
  method: 'POST',
  body: JSON.stringify({ body }),
  headers: { 'Content-Type': 'application/json' },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
~~~

### axios

~~~js
axios('https://example-api.com/users')
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

async function getData() {
  try {
    const response = await axios('https://example-api.com/users');
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

getData();

// or

axios
  .get('https://example-api.com/users')
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

axios
  .get('https://example-api.com/users', {
    params: {
      name: 'John',
      age: 30,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    auth: {
      username: 'username',
      password: 'password',
    },
  })
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

axios
  .post('https://example-api.com/users', { name: 'John', age: 30 })
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

axios
  .put('https://example-api.com/users/1', { name: 'John', age: 30 })
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

axios
  .delete('https://example-api.com/users/1')
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));

// or

axios
  .all([
    axios.get('https://example-api.com/users'),
    axios.get('https://example-api.com/posts'),
  ])
  .then(
    axios.spread((users, posts) => {
      console.log(users.data);
      console.log(posts.data);
    })
  )
  .catch((err) => console.log(err));
~~~

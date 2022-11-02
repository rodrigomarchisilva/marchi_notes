// when you don't know what type of value you are getting
// you can use unknown type, cause it is more safe than any
// unknown type will not let you do anything with it
// you have to check the type of the value first

let x: unknown;

x = 100;
x = '10';
const y = 20;

// console.log(x + y); // error, because x is unknown, so you have to check the type first

if (typeof x === 'number') {
  console.log(x + y); // 30
}

export { x, y };

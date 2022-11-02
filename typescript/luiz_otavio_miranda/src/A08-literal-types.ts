let x = 10;
x = 20;
// x = '10'; // error
const y = 20; // y now has type 20, a literal type/subtype of number
// y = 30; // error
const object = {
  name: 'João' as const, // name now has type 'João', a literal type/subtype of string
  age: 27,
};

export { x, y, object };

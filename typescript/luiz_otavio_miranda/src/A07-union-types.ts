const addOrConcat = (
  a: number | string | boolean,
  b: number | string | boolean,
) => {
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return a.toString() + b.toString();
};

console.log(addOrConcat(10, 20)); // 30
console.log(addOrConcat('10', '20')); // 1020
console.log(addOrConcat('10', 20)); // 1020
console.log(addOrConcat(10, '20')); // 1020
console.log(addOrConcat(true, false)); // truefalse

export { addOrConcat };

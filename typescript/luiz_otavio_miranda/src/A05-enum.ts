enum Colors {
  Red, // 0
  Green, // 1
  Blue, // 2
}

// using the same enum name, both unite and become one

enum Colors {
  Yellow = 10, // 10
  Pink, // 11
  Black = 'black', // 'black'
}

console.log(Colors.Red); // 0
console.log(Colors['Red']); // 0
console.log(Colors[0]); // Red
// console.log(Colors['black']); // error

enum NumberedColors {
  Red = 1,
  Green = 2,
  Blue = 4,
}

enum StringColors {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

export { Colors, NumberedColors, StringColors };

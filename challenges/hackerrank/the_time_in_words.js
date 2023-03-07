// translate hours and minutes to words

const format = (number) => {
  const below20 = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];

  const tens = ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty'];
  const splitted = number.toString().split('').map(Number);
  const secondDigit = splitted[splitted.length - 1];
  const firstDigit = splitted[0];

  return number === 15 || number === 45
    ? 'quarter' : number === 1
    ? `one minute` : number === 30
    ? 'half' : number < 20
    ? `${below20[number]} minutes` : secondDigit === 0
    ? tens[number] : `${tens[firstDigit]} ${below20[secondDigit]} minutes`;
};

const timeInWords = (h, m) => {
  return m === 0
    ? `${format(h).split(' ')[0]} o' clock` : m > 30 && h === 12
    ? `${format(60 - m)} to one` : m > 30
    ? `${format(60 - m)} to ${format(h +1).split(' ')[0]}` : m === 1
    ? `one minute past ${format(h).split(' ')[0]}` : `${format(m)} past ${format(h).split(' ')[0]}`;
};

console.log(timeInWords(5, 47));
console.log(timeInWords(3, 00));
console.log(timeInWords(7, 15));
console.log(timeInWords(5, 30));
console.log(timeInWords(5, 45));
console.log(timeInWords(12, 45));
console.log(timeInWords(12, 00));

// Expected output:
//   thirteen minutes to six
//   three o' clock
//   quarter past seven
//   half past five
//   quarter to six
//   quarter to one
//   twelve o' clock

// https://www.hackerrank.com/challenges/the-time-in-words/problem

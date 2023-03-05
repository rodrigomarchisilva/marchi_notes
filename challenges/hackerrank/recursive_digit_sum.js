// given a number n and a number k, find the super digit of n*k
// a superDigit is the sum of the digits of a number, but only when the result is lower than 10
// if the result is higher than 10, you have to sum the digits of the result, and so on, recursively

function superDigit(n, k) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += Number(n[i]);
  }
  sum *= k;
  while (sum > 9) {
    let newSum = 0;
    while (sum > 0) {
      newSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = newSum;
  }
  return sum;
}

console.log(superDigit('148', 3));

// Expected output: 3

// https://www.hackerrank.com/challenges/recursive-digit-sum/problem

// Here you get k number of values in sequence from the array, and test the difference
// between the max and min of the k values. You want to find the smallest difference.

const maxMin = (k, arr) => {
  arr.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < arr.length - k + 1; i++) {
    min = Math.min(min, arr[i + k - 1] - arr[i]);
  }
  return min;
};

const input = [
  4504,
  1520,
  5857,
  4094,
  4157,
  3902,
  822,
  6643,
  2422,
  7288,
  8245,
  9948,
  2822,
  1784,
  7802,
  3142,
  9739,
  5629,
];

console.log(maxMin(5, input));

// Expected output: 1335

// https://www.hackerrank.com/challenges/angry-children/problem
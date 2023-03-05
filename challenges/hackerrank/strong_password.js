// given a number n and a string password, find the minimum number of characters to add to password to make it strong
// a strong password is a password that has at least 6 characters, and contains at least one digit, one lowercase letter, one uppercase letter, and one special character

function minimumNumber(n, password) {
  const numbers = "0123456789";
  const lower_case = "abcdefghijklmnopqrstuvwxyz";
  const upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const special_characters = "!@#$%^&*()-+";

  const hasNumber = password.split("").some((char) => numbers.includes(char));
  const hasLowerCase = password.split("").some((char) => lower_case.includes(char));
  const hasUpperCase = password.split("").some((char) => upper_case.includes(char));
  const hasSpecialChar = password.split("").some((char) => special_characters.includes(char));

  const missing = [
    !hasNumber,
    !hasLowerCase,
    !hasUpperCase,
    !hasSpecialChar,
  ].filter((x) => x).length;

  return n + missing < 6 ? 6 - n : missing;
}

console.log(minimumNumber(3, "Ab1"));

// Expected output: 3

// https://www.hackerrank.com/challenges/strong-password/problem

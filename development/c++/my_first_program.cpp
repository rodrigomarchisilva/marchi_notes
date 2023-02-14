#include <iostream> //header file library (input and output objects)
#include <string> //header file library (string objects)
using namespace std; //allows you to use objects from the standard library

int see_in() {
  cout << "Hello World! endl will skip to the next line" << endl;
  cout << "Two \\n create a newline \n\n";
  cout << "Horizontal tab \t" << "Vertical tab \v" << endl;
  return 0;
}

// "using namespace std;" is not necessary. You can use "std::cout" instead of "cout".

int hundred = 100; // stores integers (whole numbers)
// floating point numbers can be in decimal or scientific notation
double half = 0.5; // stores floating point numbers (decimals) with double precision (15 digits)
float exponent = 1.0e-5; // stores floating point numbers (decimals) with single precision (6-7 digits)
char a = 'A'; // stores single characters (single quotes)
char b = 66; // can use ASCII code (https://www.w3schools.com/charsets/ref_html_ascii.asp)
string helloWorld = "Hello World!"; // stores text (double quotes)
bool trueValue = 1 == 2; // stores values with two states: true or false

class concatenate_variables {
  public: void concatenate() { cout << "My grandmother is " << hundred << " years old."; }
};

class define_multiple_variables {
  int x = 5, y = 6, z = 50;
  public: void print_multiple_variables() { cout << x + y + z; }
};

class same_value_multiple_variables {
  public: void print_same_value_multiple_variables() {
    int x, y, z;
    x = y = z = 50;
    cout << x + y + z;
  }
};

// Identifiers are names used to identify variables, functions, classes, modules, etc.

// Can contain letters, digits and underscores
// Cannot begin with digits
// Are case sensitive
// Cannot contain whitespaces or special characters like !, #, %, etc.
// Reserved words (like C++ keywords, such as int) cannot be used as names

class constants {
  public: void print_constants() {
    const int PI = 3.14; // constants are unchangeable and read-only
    cout << PI;
  }
};

class see_out {
  public: void get_user_input() {
    int x;
    cout << "Enter a number: ";
    cin >> x;
    cout << "You entered " << x;
  }
};

class arithmetic_operators {
  public: void print_arithmetic_operators() {
    int x = 5, y = 6;
    cout << x + y; // addition
    cout << x - y; // subtraction
    cout << x * y; // multiplication
    cout << x / y; // division
    cout << x % y; // modulus (remainder)
    cout << x++; // increment
    cout << x--; // decrement
  }
};

class assignment_operators {
  public: void print_assignment_operators() {
    int x = 5;
    x += 3; // x = x + 3
    x -= 3; // x = x - 3
    x *= 3; // x = x * 3
    x /= 3; // x = x / 3
    x %= 3; // x = x % 3
    x &= 3; // x = x & 3
    x |= 3; // x = x | 3
    x ^= 3; // x = x ^ 3
    x >>= 3; // x = x >> 3
    x <<= 3; // x = x << 3
  }
};

class comparison_operators {
  public: void print_comparison_operators() {
    int x = 5, y = 3;
    cout << (x == y); // equal to
    cout << (x != y); // not equal to
    cout << (x > y); // greater than
    cout << (x < y); // less than
    cout << (x >= y); // greater than or equal to
    cout << (x <= y); // less than or equal to
  }
};

class logical_operators {
  public: void print_logical_operators() {
    int x = 5, y = 3;
    cout << (x < 10 && y > 1); // logical AND
    cout << (x < 10 || y > 1); // logical OR
    cout << !(x == y); // logical NOT
  }
};

// convert an integer from 0-255 to an 8-bit binary number
// you have the column as it follows: 128 64 32 16 8 4 2 1
// eg. 78 = 01001110, because 78 = 64 + 8 + 4 + 2
// for each column, if the number is greater than the column, you put a 1, otherwise you put a 0
// your first column is 128, which is greater than 78, so you put a 0
// your second column is 64, which is less than 78, so you put a 1 and subtract 64 from 78 = 14
// your third column is 32, which is greater than 14, so you put a 0
// your fourth column is 16, which is greater than 14, so you put a 0
// your fifth column is 8, which is less than 14, so you put a 1 and subtract 8 from 14 = 6
// your sixth column is 4, which is less than 6, so you put a 1 and subtract 4 from 6 = 2
// your seventh column is 2, which is equal to 2, so you put a 1 and subtract 2 from 2 = 0
// your eighth column is 1, which is greater than 0, so you put a 0

int bitwise() {
  int x = 185, y = 1, z = 39; // in bits, 185 = 10111001, 1 = 00000001 and 39 = 00100111
  int a = x & y; // a = 00000001 or 1, because the result is 1 if both bits are 1 and 0 otherwise
  int b = x >> y; // b = 01011100 or 92, because x is shifted right by 1 bit
  int c = x << y; // c = 01110010 or 370, because x is shifted left by 1 bit
  int d = x & z; // d = 00100001 or 33, because the result is 1 if both bits are 1 and 0 otherwise
}

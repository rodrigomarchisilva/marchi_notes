# TypeScript Basics

~~~ts
function arrayDiff(a, b) {
  let output = [];
  a.forEach((a_number) => {
    const b_find = b.find((b_number) => b_number === a_number);
    if (!b_find) output = [...output, a_number]
  });
  return output;
};

console.log(arrayDiff([1, 2], [1]));
console.log('yes');

function descendingOrder(n){
  return Number(Array.from(n.toString()).map((char) => Number(char)).sort((a, b) => b - a).join(''));
}

console.log(descendingOrder(1234567089));

const string = new String();
const array = new Array();
const number = new Number();
~~~

* Transformar string em array:

~~~ts
string.split('');
Array.from(string);
~~~

* Transformar array em string:

~~~ts
array.join('');
JSON.stringify(array);
~~~

* Transformar number em string:

~~~ts
String(number);
number.toString();
number + '';
~~~

* Transformar string em number:

~~~ts
Number(string);
+string;
parseInt('12');
~~~

---

## Compilador

Tranforma TS em JS

* **Instalar o compilador no global:** npm install -g typescript
* **Execução no global:** tsc nomeDoArquivo.ts
* **Execução sem instalar:** npx tsc nomeDoArquivo.ts
* **Rodar o arquivo gerado com Node:** node nomeDoArquivo.js

## Melhor prática

* **Instalação no projeto**

~~~properties
npm i -D typescript
~~~

* **Utilização**

~~~properties
npx tsc --init
~~~

---

// boolean : recebe verdadeiro ( true ) ou falso ( false )
let yes: boolean = true; // cria uma variável de nome "yes" e diz que o tipo é boleano e o valor é true
let no: boolean = false; // cria uma variável de nome "no" e diz que o tipo é boleano e o valor é false

---

// number : recebe valores numéricos e assim como no JavaScript todos são valores de ponto flutuante.
let x: number; // cria uma variável de nome "x" e diz que o tipo é number mas não seta o valor
let y: number = 0;
let z: number = 123.456;

---

// string : recebe uma sequência de caracteres armazenados como unidades de código UTF-16 Unicode.
let s: string;
let empty: string = "";
let abc: string = 'abc';

---

// void : existe apenas para indicar a ausência de um valor, como em uma função sem valor retornado.
function sayHelloWorld(): void {
  console.log("Hello World!");
}

---

// null e undefined : são subtipos de todos os outros tipos.
let nullValue = null;
let undefinedValue = undefined;

---

// Inferência de tipo
let flag = true; // o compilador irá inferir o tipo boolean
const numberPI = 3.1416; // o compilador irá inferir o tipo number
let message = "Hello World!"; // o compilador irá inferir o tipo string

---

// TypeScript Playground -> https://www.typescriptlang.org/pt/play/

---

// Enumeração
enum cardinalDirections {
  north = 'N',
  south = 'S',
  east = 'E',
  west = 'W'
}

---

// Arrays
// Sintaxe: let arrayName: type[] = [...];
let names: string[] = ["Mary Joe", "Alan Joe"];

---

// Tuplas
/// Sintaxe: variableName: [type, type, ...];
let fullName: [string, string] = ['Jane', 'Doe'];
let person: [string, number] = ['Jane Doe', 35];
let car: [string, string, number] = ["Ford", "F400", 10];

---

// Type Aliases (apelido de tipo)

type Point = {
  x: number;
  y: number;
};


function printCoord(pt: Point) {
  console.log("O valor da cordenada x é: " + pt.x);
  console.log("O valor da coordenada y é: " + pt.y);
}

printCoord({ x: 100, y: 100 });
//saída:
//O valor da cordenada x é: 100
//O valor da cordenada y é: 100

---

// Type Unions
// A função abaixo pode receber tanto um número quanto uma string.
function retornarCPF(cpf: number | string){
  console.log("Seu CPF é: " + cpf);
}

---

// Classes
// Projetos para criação de objetos

enum EyeColor {
    Black = "Pretos",
    Blue = "Azuis",
    Greem = "Verdes",
    Brown = "Castanhos",
}

class Person {
    _name: string;
    _birthDate: Date;
    _eyeColor?: EyeColor; // O "?" torna o parâmetro opcional

    constructor(name: string, birthDate: Date, eyeColor?: EyeColor) {
        this._name = name;
        this._birthDate = birthDate;
        this._eyeColor = eyeColor;
    }

    speak(): void {
        console.log(`${this.name} está falando.`);
    }
}

const person1 = new Person("Jane Doe", new Date("1986-01-01"));
person1.speak();
// "Jane Doe está falando."

---

// Interfaces

interface Employee {
    firstName: string;
    lastName: string;
    fullName(): string;
}

let employee: Employee = {
    firstName : "John",
    lastName: "Doe",
    fullName(): string {
        return this.firstName + " " + this.lastName; // usamos o “this” para acessar as propriedades da interface
    }
}

interface Teacher extends Employee {
    firstName: string;
    lastName: string;
    subject: string;
    fullName(): string;
    sayHello(): string;
}

let teacher: Teacher = {
    firstName: "John",
    lastName: "Doe",
    subject: "Matemática",
    fullName(): string {
        return this.firstName + " " + this.lastName;
    },
    sayHello(): string {
        return `Olá, eu sou ${this.fullName()} e leciono ${this.subject}`;
    }
}

// Classes também podem implementar interfaces , o que faz com que a classe possua todas as propriedades e métodos daquela interface .

---

// Generics

// Ao usar any, passa a ser possível declarar o stringArray abaixo com numbers ou vice-versa

function getArray(items : any[]) : any[] {
    return new Array().concat(items);
}

let numberArray = getArray([5, 10, 15, 20]);
let stringArray = getArray(['Cats', 'Dogs', 'Birds']);

// O generics soluciona isso, tornando o tipo dinâmico, selecionável ao declarar a variável

function getArray<T>(items : T[]) : T[] {
    return new Array<T>().concat(items);
}

let numberArray = getArray<number>([5, 10, 15, 20]);
let stringArray = getArray<string>(['Cats', 'Dogs', 'Birds']);

// Passando mais de um tipo

function identity<T, U> (value: T, message: U) : T {
    console.log(message);
    return value
}

let returnNumber = identity<number, string>(100, 'Olá');
let returnString = identity<string, string>('100', 'Mundo');
let returnBoolean = identity<boolean, string>(true, 'Olá, Mundo!');

// Usando em interfaces

interface ProcessIdentity<T, U> {
    (value: T, message: U): T;
}

function processIdentity<T, U> (value: T, message: U) : T {
    console.log(message);
    return value
}

let processor: ProcessIdentity<number, string> = processIdentity;
let returnNumber = processor(100, "Olá");
let returnString = processor("Olá", 100); // Type check error: Argument of type 'string' is not assignable to parameter of type 'number'.

// Usando em classes

class ProcessIdentity<T, U> {
    _value: T;
    _message: U;
    constructor(value: T, message: U) {
        this._value = value;
        this._message = message;
    }
    getIdentity() : T {
        console.log(this._message);
        return this._value
    }
}

let processor = new ProcessIdentity<number, string>(100, "Olá");
processor.getIdentity();  // imprime "Olá" e retorna 100

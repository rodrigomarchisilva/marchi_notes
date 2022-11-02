# TypeScript

## tsconfig.json

~~~json
{
  "extends": "@tsconfig/node14/tsconfig.json", // estendemos a configuração base para o Node 14
  "compilerOptions": {
    "outDir": "./dist", // pasta onde nossos arquivos compilados serão salvos
  },
}
~~~

## Maneira primordial

~~~ts
class Person {
  name: string;

  constructor(n: string) {
    console.log(`Creating person ${n}`);
    this.name = n;
  }

  sleep() {
    console.log(`${this.name}: zzzzzzz`);
  }
}
~~~

---

## Usando atributos privados, getters e setters

~~~ts
class Person {
  name: string; // public by default
  private _weight: number; // private
  private _age: number; // private
  readonly height: number; // readonly

  constructor(name: string, height: number, weight: number, age: number) {
    this.name = name;
    this._weight = weight;
    this._age = age;
    this.height = height;
  }
~~~

* Tornar o atributo privado `_weight` acessível através do `pessoa1.getWeight()`

~~~ts
  getWeight() {
    return this._weight;
  }
~~~

* Tornar o atributo privado `_age` acessível através do `pessoa1.age`

~~~ts
  get age() {
    return this._age;
  }
~~~

* Tornar o atributo privado `_age` mutável através do `pessoa1.age = x`

~~~ts
  set age(newValue: number) {
    if (newValue >= 0 && newValue < 200) {
      this._age = newValue;
    }
  }

  birthday() {
    this._age += 1;
  }
}
~~~

---

* Criando variáveis direto no constructor

~~~ts
constructor(public name: string, private birthDate: Date) { }
~~~

* Criando classe que herda de outra

~~~ts
class Mammal extends Animal { }
~~~

* Protected permite acesso por herança

~~~ts
protected age: number;
~~~

---

## Adicionando constructor na subclasse

~~~ts
class Animal {
  constructor(protected birthDate: Date) { }
}
class Bird extends Animal {
  constructor(public name: string) {
    super(new Date());
  }
}
~~~

---

## Implementando interfaces

~~~ts
interface Animal {
  name: string;
  getBirthDate(): Date;
  age: number;
}

class Bird implements Animal {
  private _birthDate;
  constructor(public name: string, birthDate: Date) {
    this._birthDate = birthDate;
  }
  get age() {
    return new Date().getFullYear() - this._birthDate.getFullYear();
  }
  getBirthDate() {
    return this._birthDate;
  }
  fly() { console.log(`${this.name} está voando!`); }
}
~~~

---

## Sobrescrita de método sem e com super

~~~ts
class Animal {
  constructor(public name: string) { }
  move() { console.log(`${this.name} está se movendo.`); }
}

class Bird extends Animal {
  move() {
    super.move();
    console.log(`${this.name} está voando.`);
  }
}

class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

const a = new Animal('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}

myMove(a); // Tubarão está se movendo.
myMove(b); // Papagaio está se movendo. && Papagaio está voando.
myMove(m); // Tatu está andando.
~~~

---

## Classe abstrata e método abstrato

> A classe abstrata Animal não pode ser instanciada, só as subs.

~~~ts
abstract class Animal {
  constructor(public name: string) { }
  abstract move(): void
}

class Bird extends Animal {
  move() { console.log(`${this.name} está voando.`); }
}

class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

class Fish extends Animal {
  move() { console.log(`${this.name} está nadando.`); }
}

const a = new Fish('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}

myMove(a); // Tubarão está nadando.
myMove(b); // Papagaio está voando.
myMove(m); // Tatu está andando.
~~~

---

## Métodos (e atributos) estáticos

> * Métodos e atributos estáticos são acessados diretamente pela classe, não pelo objeto instanciado.
> * No `static`, o `this` não referencia o objeto instanciado, mas sim a classe.

~~~ts
class Employee {
  private static employeeCount = 0

  constructor(public name: string) {
    Employee.addEmployee();
  }

  private static addEmployee() {
    this.employeeCount += 1;
  }

  static get employees() {
    return this.employeeCount;
  }
}

console.log(Employee.employees); // 0
const e1 = new Employee('Ronald');
console.log(Employee.employees); // 1
const e2 = new Employee('Cíntia');
console.log(Employee.employees); // 2
~~~

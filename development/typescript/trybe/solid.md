# SOLID in TypeScript

## Maneira primordial de criar uma classe

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

// Tornar o atributo privado _weight acessível através do pessoa1.getWeight()
  getWeight() {
    return this._weight;
  }

// Tornar o atributo privado _age acessível através do pessoa1.age
  get age() {
    return this._age;
  }

// Tornar o atributo privado _age mutável através do pessoa1.age = x
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

* A classe abstrata Animal não pode ser instanciada, só as subs.

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

* Métodos e atributos estáticos são acessados diretamente pela classe, não pelo objeto instanciado.
* No static, o this não referencia o objeto instanciado, mas sim a classe.

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

---

## Polimorfismo com interfaces

* Mesmo esquema das classes.

~~~ts
interface Person {
  id: number;
  name: string;
  showIdentification(): void;
}

class PhysicalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cpf;

  constructor(name: string, cpf: string) {
    this._id = PhysicalPerson.newId();
    this._name = name;
    this._cpf = cpf;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cpf() { return this._cpf; }
  showIdentification() { console.log(this.id, this._cpf); }
}

class LegalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cnpj;

  constructor(name: string, cnpj: string) {
    this._id = LegalPerson.newId();
    this._name = name;
    this._cnpj = cnpj;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cnpj() { return this._cnpj; }
  showIdentification() { console.log(this.id, this._cnpj); }
}

const pp0 = new PhysicalPerson('John', '123456789');
const pp1 = new PhysicalPerson('Jenny', '987654321');
const lp = new LegalPerson('International Sales SA', '834729384723');

const showIdentification = (person: Person) => {
  person.showIdentification();
}

showIdentification(pp0); // 0 123456789
showIdentification(pp1); // 1 987654321
showIdentification(lp); // 2 834729384723
~~~

---

## Garantia de tipo com generics

* Sem o generics

~~~ts
class Contract {
  static _number = 0;
  constructor(public broker: Person){}
  static get number() { return this._number; }
}

const c1 = new Contract(pp0);
console.log(c1.broker.cpf); // Erro, pois não existe cpf em Person

  // -> Com o generics

class Contract<T> { // A classe recebe o genérico T
  static _number = 0;
  constructor(public broker: T) { } // T no lugar de Person
  static get number() { return this._number; }
}

// Tipo inferido (não explícito)
const c1 = new Contract(pp0); // TypeScript "subentende" que pp0 é pessoa física
console.log(c1.broker.cpf); // 123456789

// Tipagem explícita
const c2: Contract<LegalPerson> = new Contract(lp); // Deixo explícito que lp é pessoa jurídica
console.log(c2.broker.cnpj); // 834729384723
~~~

---

* **S ingle responsibility ->** Uma classe só deve ter uma responsabilidade.
  * Nomes descritivos, responsabilidade única e complexidade cognitiva baixa, facilitando os testes.

* **O open-closed ->** Uma classe deve ser aberta para extensão, fechada para modificação.
    // Ao invés de ficar sempre mexendo no código, criar algo genérico e ir extendendo para casos específicos.

* **D dependency inversion ->** Classes de alto nível não devem depender de classes de baixo nível. Devem depender ambas de abstrações.

> * Se uma função ou classe de alto nível (Higher) utiliza outra função ou classe de mais baixo nível (Lower) em seu interior,
> * Lower deve ser passada para Higher por quem chama/usa Higher, e não estar explicitamente instanciada dentro de Higher.

* Ao invés de

~~~ts
class Musician {
  flute: Flute
  constructor(public name: string) {
    this.flute = new Flute('minha flauta');
  }
}
~~~

* Utilizar

~~~ts
class Musician {
  constructor(public name: string, public flute: Flute) { }
}
~~~

> * Higher não deve esperar especificamente Lower, mas sim uma abstração qualquer (vamos chamar de Abstraction), que geralmente é uma interface, que Lower deve respeitar.
> * Isso faz com que, caso queiramos passar algo diferente de Lower para Higher, vamos supor uma Lower2, desde que Lower2 também implemente Abstraction, não haverá problemas.

~~~ts
interface Instrument {
  name: string;
  play(): void;
}

class Flute implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Drums implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está fazendo o ar vibrar bem forte`);
  }
}

class Guitar implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está vibrando suas cordas`);
  }
}

class Musician {
  constructor(
    public name: string,
    public instrument: Instrument = new Flute('Minha flauta')
  ) { }

  play() {
    this.instrument.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão dos sons`
    );
  }
}

const musician1 = new Musician('Márcia');
const musician2 = new Musician('Vicente', new Drums('Minha bateria'));
const musician3 = new Musician('Natan', new Guitar('Meu violão'));

musician1.play();
musician2.play();
musician3.play();
~~~

---

* **L iskov substitution ->** Uma classe deve ser substituída por outra que possua os mesmos comportamentos.
* **I interface segregation ->** Várias interfaces específicas ao invés de uma interface genérica multipropósito.

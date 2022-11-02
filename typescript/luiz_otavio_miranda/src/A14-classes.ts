// public means everyone is allowed to access
// private means that only members of the same class are allowed to access
// protected means that members of subclasses are also allowed.
// readonly means that the property can't be changed after initialization
// static means that the property is shared by all instances of the class
// abstract means that the class can only be used as a base class
// neither static nor abstract can be instantiated

export class Company {
  public readonly name: string; // it is public by default
  protected readonly employees: Employee[] = [];
  private static readonly maxEmployees: number = 10;

  constructor(name: string, public readonly address: string) {
    this.name = name;
  }

  public describe(): void {
    console.log(`Empresa ${this.name} está localizada em ${this.address}`);
  }

  public addEmployee(employee: Employee): void {
    if (Company.maxEmployees > this.employees.length) {
      this.employees.push(employee);
    } else {
      throw new Error('Max employees reached');
    }
  }

  public printEmployeesInformation(): void {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

export class ITCompany extends Company {
  constructor(name: string, address: string, public readonly admins: string[]) {
    super(name, address);
  }
}

export class Employee {
  constructor(public readonly name: string, public readonly age: number) {}
}

const company1 = new Company('Udemy', 'Av. Paulista');
console.log(company1);
company1.describe();
company1.addEmployee(new Employee('João', 30));
company1.addEmployee(new Employee('Maria', 25));
company1.printEmployeesInformation();

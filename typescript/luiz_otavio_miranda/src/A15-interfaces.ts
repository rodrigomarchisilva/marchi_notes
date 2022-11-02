// Interfaces are better when you need to define a new object or method of an object.
// Types are better when you need to create a function or variable.

interface TypeName {
  name: string;
}

interface TypeLastName {
  lastName: string;
}

interface TypeFullName {
  fullName: string;
}

const person: TypeName = {
  name: 'John',
};

const person2: TypeLastName = {
  lastName: 'Doe',
};

const person3: TypeFullName = {
  fullName: 'John Doe',
};

interface Person extends TypeName, TypeLastName, TypeFullName {
  age: number;
}

const person4: Person = {
  name: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  age: 30,
};

export { person, person2, person3, person4 };

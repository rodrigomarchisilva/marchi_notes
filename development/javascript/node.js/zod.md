# Zod

- Apesar de parecer muito com Yup e Joi para validação, a função mais importante do Zod é a de tipagem (TypeScript).
- Também é possível manipular os dados de `input` para ter o `output` desejado, usando o método `transform`.

~~~js
import { z } from 'zod';

const personSchema = z.object({
  name: z.string(),
  age: z.string().transform(age => Number(age)),
  email: z.string().email().nullable(),
});

type PersonSchemaInput = z.input<typeof personSchema>;
type PersonSchemaOutput = z.output<typeof personSchema>;

const person = personSchema.parse({
  name: 'John',
  age: '30',
  email: 'johndoe@gmail.com',
});

const { name, email, age } = personSchema.parse(person);

function createPerson(person: PersonSchemaOutput) {
  people.push(person);
}
~~~

- É possível usar o `refine` para criar validações customizadas

~~~js
const fordCarsSchema = z.object({
  cars: z.array(
    z.object({
      name: z.string(),
      brand: z.string(),
      year: z.string(),
  }))
  .refine(cars => 
    cars.filter(car => car.brand === 'Ford').length > 0,
    { message: 'You must have at least one Ford car' }
  )
  .transform(cars => 
    cars.map(car => ({
      ...car,
      year: Number(car.year),
    }))
  ),
});

type FordCarsSchemaInput = z.input<typeof fordCarsSchema>;
type FordCarsSchemaOutput = z.output<typeof fordCarsSchema>;
~~~

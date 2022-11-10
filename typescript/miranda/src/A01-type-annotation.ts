// Tipos básicos (aqui ocorre inferência de tipos, ou seja, não precisa definir o tipo)
const nome = 'João';
const idade = 27;
const adulto = true;
const simbolo = Symbol('qualquer-symbol');

// Arrays
const arrayDeNumeros: Array<number> = [1, 2, 3];
const arrayDeNumeros2: number[] = [1, 2, 3];

// Objetos
const pessoa: { nome: string; idade: number; adulto?: boolean } = {
  idade: 27,
  nome: 'João',
};

// Funções
function soma(x: number, y: number): number {
  return x + y;
}

const soma2: (x: number, y: number) => number = (x, y) => x + y;

export {
  nome,
  idade,
  adulto,
  simbolo,
  arrayDeNumeros,
  arrayDeNumeros2,
  pessoa,
  soma,
  soma2,
};

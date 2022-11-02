const objetoA: {
  chaveA: string; // value with type string
  readonly chaveB: string; // readonly: cannot be changed
  chaveC?: string; // optional key
  [key: string]: unknown; // index signature / dynamic key: undefined amount of optional keys with type unknown
} = {
  chaveA: 'Valor A',
  chaveB: 'Valor B',
};

objetoA.chaveA = 'Outro valor na chave A';
// objetoA.chaveB = 'Outro valor na chave B'; // readonly, cannot be changed
objetoA.chaveC = 'Nova chave C';
objetoA.chaveD = 'Nova chave D';
objetoA.chaveE = 'Nova chave E';

export { objetoA };

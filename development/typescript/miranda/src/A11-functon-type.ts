type MapStringsCallback = (item: string) => string;

function mapStrings(array: string[], fn: MapStringsCallback): string[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i]));
  }
  return result;
}

const abc = ['a', 'b', 'c'];
const abcMapped = mapStrings(abc, (item) => item.toUpperCase());

export { abcMapped };

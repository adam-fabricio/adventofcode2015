console.time();
const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url).pathname;
const input = Deno.readTextFileSync(filePath).trim();


export function solver(input: string, part: number) {
  for (let i = 0; i < part; i++) {
    const chars = input.split("").map(Number);
    let newString = '';
    let counter = 0
    let value = 0
    chars.forEach((char, index) => {
      if (index === 0) {
        value = char;
        counter++;
        if (index === chars.length - 1) {
          newString += counter;
          newString += value;
        }
        
      } else {
        if (value == char) {
          counter++;
          if (index === chars.length - 1) {
            newString += counter;
            newString += value;
          }
        } else {
          newString += counter;
          newString += value;
          counter = 1;
          value = char;
          if (index === chars.length - 1) {
            newString += counter;
            newString += value;
          }
        }
      }
    });
    // console.log(i + 1, newString)
    input = newString;
  }
  return input.length
}
console.timeEnd();
console.time();
console.log('parte 1:', solver(input, 40));
console.timeEnd();
console.time();
console.log('parte 2:', solver(input, 50));
console.timeEnd();

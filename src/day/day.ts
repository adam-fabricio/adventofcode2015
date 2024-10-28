const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url).pathname;
const input = Deno.readTextFileSync(filePath).trim();

export function solver(input: string, part: number) {

}

console.log('parte 1:', solver(input, 1));
// console.log('parte 2:', solver(input, 2));
#!/usr/bin/env -S deno run --allow-read --allow-write

const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url);
const input = Deno.readTextFileSync(filePath).trim();

export function solver(input: string, part: number) {
  console.log(input);
}

console.log('parte 1:', solver(input, 1));
// console.log('parte 2:', solver(input, 2));

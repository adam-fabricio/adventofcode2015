import { readFileSync } from "fs";
import path from "path";

const file = path.join(__dirname, 'test.txt');
const data = readFileSync(file, 'utf-8');
const input = data.trim()

export function solver(input: string, part: number) {

}

console.log('parte 1:', solver(input, 1));
console.log('parte 2:', solver(input, 2));
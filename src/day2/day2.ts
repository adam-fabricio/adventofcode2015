import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "input.txt");
const data = readFileSync(filePath, "utf-8");
const input = data.trim()

export function areaDePapel(input: string, part: number): number {
    return input.split("\n").reduce((acc, presente) => {
        const [a, b, c] = presente.split("x").map(Number).sort((a, b) => a - b);
        if (part === 1){
            const area_prisma = 2 * a * b + 2 * a * c + 2 * b * c;
            const area_adicional = a * b;
            return acc + area_prisma + area_adicional;
        } else {
            const perimetro_menor = 2 * a + 2 * b;
            const volume = a * b * c;
            return acc + perimetro_menor + volume; 
        }
        
    }, 0);
}

console.log(`parte1: ${areaDePapel(input, 1)}`);
console.log(`parte2: ${areaDePapel(input, 2)}`);
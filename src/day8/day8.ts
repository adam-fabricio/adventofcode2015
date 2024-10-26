import { readFileSync } from "fs";
import path from "path";

const file = path.join(__dirname, 'input.txt');
const data = readFileSync(file, 'utf-8');
const input = data.trim()

export function solver(input: string, part: number) {
    const linhas = input.split("\n");
    
    let literals: number = 0;
    let memory: number = 0;
    
    if (part === 1){
        linhas.forEach(linha => {
            literals += linha.length;
            const raw_line = linha.replaceAll("\\\"", "\"")
                                    .replaceAll("\\\\", "\\")
                                    .replaceAll(/\\x[0-9a-fA-F]{2}/gi, "@");
            
            memory += raw_line.length - 2;
        });
        return literals - memory
    } else {
        linhas.forEach(linha => {
            const raw_line = linha.replaceAll("\\", "\\\\")
                                    .replaceAll("\"", "\\\"");
            
            literals += linha.length;
            memory += raw_line.length + 2;

        });
        return memory - literals
    }


}

console.log('parte 1:', solver(input, 1));
console.log('parte 2:', solver(input, 2));
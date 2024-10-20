import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "input.txt");
const data = readFileSync(filePath, "utf-8");
const input = data.trim()

export function solver(input: string, parte: number) {
    
    
    const setCasas = new Set<string>();
    const comandos = input.split("");
    let posicao = [0, 0]
    let movimento = [0, 0];
    let robo = [0, 0];

    
    setCasas.add(posicao.toString())
    

    for (let i = 0; i < comandos.length; i++){
        switch (comandos[i]) {
            case "^":
                movimento = [0, 1]; 
                break;
            case "v":
                movimento = [0, -1]; 
                break;
            case ">":
                movimento = [1, 0]; 
                break;
            case "<":
                movimento = [-1, 0]; 
                break;
            default:
                break;
        }
        
        if ( parte === 1 || i % 2 === 0) {
            posicao = [posicao[0] + movimento[0], posicao[1] + movimento[1]];
            setCasas.add(posicao.toString());
        } else {
            if ( i % 2 === 1) {
                robo = [robo[0] + movimento[0], robo[1] + movimento[1]];
                setCasas.add(robo.toString());
            }
        }



        
    }

    return setCasas.size;
}

console.log(solver(input, 1));
console.log(solver(input, 2));
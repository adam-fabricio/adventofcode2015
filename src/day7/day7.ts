import { readFileSync } from "fs";
import path from "path";

const file = path.join(__dirname, 'input.txt');
const data = readFileSync(file, 'utf-8');
const input = data.trim()

function calcula(vars: string[], logica: string, resultado: Map<string, number>): number {
    let var1 = Number(vars[0]);
    if (isNaN(var1))
        var1 = resultado.get(vars[0]) as number;
    if (logica === 'NOT') {
        return ~var1 & 0xFFFF;  
    } else {
        let var2 = Number(vars[1])
        if (isNaN(var2))
            var2 = resultado.get(vars[1]) as number;
        switch (logica) {
            case 'AND':
                return var1 & var2;
            case "OR":
                return var1 | var2;
            case "LSHIFT":
                return var1 << var2;
            case "RSHIFT":
                return var1 >> var2 & 0xFFFF;
            default:
                return var1;
        }
    }
}

export function solver(input: string, part: number, bValue: number = 0): number {

    let resultado = new Map<string, number>();
    let variaveis = new Map<string, Map<string, string[] | string>>();
 
    // Parsing
    const linhas = input.split("\n");

    linhas.forEach(linha => {
        const valoresInternos = new Map<string, string[] | string>();
        let wire, logica;
        
        [logica, wire] = linha.split(" -> ");

        const partesLogica = logica.split(" ");
        if (partesLogica.length === 1) {
            const value = Number(partesLogica);
            if (!isNaN(value)) {
                resultado.set(wire, value);
            } else {
                valoresInternos.set("vars", partesLogica);
                valoresInternos.set("logic", '');
                variaveis.set(wire, valoresInternos);
            }    
        } else if (partesLogica.length === 2) {
            valoresInternos.set("vars", [ partesLogica[1] ] );
            valoresInternos.set("logic", partesLogica[0]);
            variaveis.set(wire, valoresInternos);
        } else {
            valoresInternos.set("vars", [ partesLogica[0], partesLogica[2] ] );
            valoresInternos.set("logic", partesLogica[1]);
            variaveis.set(wire, valoresInternos)
        }
    });
    if (part === 2)
        resultado.set('b', bValue);
    let i = 0
    // resolve o item e tira da lista de variaveis
    while (variaveis.size > 0) {
        variaveis.forEach((submap, variavel) => {
            const vars = submap.get('vars') as string[];
            const possivelResolver = vars.every(item => !isNaN(Number(item)) || resultado.has(item));
            if (possivelResolver) {
                const logica = submap.get('logic') as string;
                resultado.set(variavel, calcula(vars, logica, resultado));
                variaveis.delete(variavel);
            }
        });
        i++
    }
    console.log(`iterações: ${i}`);
    return resultado.get('a') as number;

}

const resultPart1 = solver(input, 1);
console.log('parte 1:', resultPart1);
console.log('parte 2:', solver(input, 2, resultPart1));
#!/usr/bin/env -S deno run --allow-read --allow-write


const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url);
const input = Deno.readTextFileSync(filePath).trim();

function calcula(objeto: Array<object> | object ): number {
  let resultado = 0;
  // verifica se o objeto é uma lsita ou um dicionario
  if (Array.isArray(objeto)) {
    // Na lista itera sobre cada item da lista
    for (const item of objeto) {
      // verifica se o item da lista é outra lista ou um dicionario
      if (typeof item === "object") {
        // calcula via recursao
        resultado += calcula(item);
      } else {
        // se o item da lista for um numero ele soma o numero
        if (typeof item === "number") {
          resultado += item
        }
      }
    }
    // retorna o resultado da lista
    return resultado
  } else {
    // é um dicionari
    for (const [_chave, valor] of Object.entries(objeto)) {
      // verifica se o valor é um objeto
      if (typeof valor === "object") {
        resultado += calcula(valor)
      } else if (valor === "red") {
        return 0
      } else if (typeof valor === "number") {
        resultado += valor;
      }
    }
    return resultado
  }
}


export function solver(input: string, part: number) {
  const regex: RegExp = /[-]?[0-9]+/g;
  const numeros: string[] = input.match(regex) as string[];
  const listResult: number[] = numeros.map(Number);
  const sumResult: number = listResult.reduce((acc, item) => acc + item, 0)
  if (part == 1) {
    return sumResult
  }
  const lista = JSON.parse(input);
  
  return calcula(lista);

}

console.log('parte 1:', solver(input, 1));
console.log('parte 2:', solver(input, 2));

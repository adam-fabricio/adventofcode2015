#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../../utils/utils.ts";

interface trocasInterface {
  [molecula: string]: string[];
}

function parsingTroca(entrada: string): trocasInterface {
  const result: trocasInterface = {}
  entrada.split("\n").forEach((valor) => {
    const campo = valor.split(" => ");
    if (!result[campo[0]]) {
      result[campo[0]] = [] 
    }
    result[campo[0]].push(campo[1]);
  });



  return result;
}

function realizarTrocas(trocas: trocasInterface, rawMolecula: string): Set<string> {

  const resultados = new Set<string>();

  Object.keys(trocas).forEach((troca) => {
    const tamanho = troca.length;
    for (let indice = 0; indice < rawMolecula.length; indice++) {
      const fatia = rawMolecula.slice(indice, indice + tamanho);
      if (fatia === troca) {
        const inicio = rawMolecula.slice(0, indice);
        const final = rawMolecula.slice(indice + tamanho);
        for (const valor of trocas[troca]) {
          resultados.add(`${inicio}${valor}${final}`);
        }
      }
    }
  });
  return resultados

}


function solver(input: string, part: number) {
  const [rawTrocas, rawMolecula] = input.split("\n\n");
  const trocas = parsingTroca(rawTrocas);
  let resultados = new Set<string>();

  if (part == 2) {
    resultados.add("e");
    let i = 0;
    while (true) {
      let resultadosTemp = new Set<string>();
      for (const molecula of resultados.values()){
        if (molecula.includes("HOHOHO")) {
          return i;
        }
        const trocasRealizadas = realizarTrocas(trocas, molecula);
        resultadosTemp = resultadosTemp.union(trocasRealizadas);
      }
      resultados = resultadosTemp;
      console.log(rawMolecula.length, resultados.size);
      i++;
    }
  } else {
    resultados = realizarTrocas(trocas, rawMolecula);
    return resultados.size;
  }

}

const entrada = "input.txt";
const input: string = leArquivo(entrada, import.meta.url);

const evens = new Set<string>();
const squares = new Set([1, 4, 9]);
console.log(evens.union(squares)); // Set(6) { 2, 4, 6, 8, 1, 9 }



console.log("parte 1:", solver(input, 1));
console.log('parte 2:', solver(input, 2));

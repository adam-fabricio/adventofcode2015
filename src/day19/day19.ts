#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../../utils/utils.ts";

interface trocasInterface {
  [molecula: string]: string[];
}

function parsingTroca(entrada: string): trocasInterface {
  const result: trocasInterface = {}
  entrada.split("\n").forEach((valor) => {
    const campo = valor.split(" => ");
    if (result[campo[0]) {
      
    }
    dict[campo[0]] = campo[1];
    return dict;
  });


  return listResult;
}

function solver(input: string, part: number) {
  const [rawTrocas, rawMolecula] = input.split("\n\n");
  console.log(rawTrocas);
  console.log(rawMolecula);
  const trocas = parsingTroca(rawTrocas);

  console.log(trocas);

}

const entrada = "test.txt";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));

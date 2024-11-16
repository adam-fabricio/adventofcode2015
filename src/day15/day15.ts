#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../../utils/utils.ts";

function solver(input: string, part: number) {
  const indicesCampos = [1, 3, 5, 7, 9];
  const indiceValores = [2, 4, 6, 8, 10];
  const entrada: parseDict = parsingDict(input, indicesCampos, indiceValores);

  const ingredientes = Object.keys(entrada);
  console.log(`ingredientes: ${ingredientes}`);
  const propriedades = Object.keys(entrada[ingredientes[0]]);
  const calorias = propriedades.pop();
  console.log(calorias);
  console.log(`propriedades: ${propriedades}`);

  let resultado = 0;
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
      for (let k = 0; k <= 100 - i - j; k++) {
        const l = 100 - i - j - k;
        let produto = 1;

        if (part === 2) {
          const valorCalorias = i * entrada[ingredientes[0]][calorias] +
            j * entrada[ingredientes[1]][calorias] +
            k * entrada[ingredientes[2]][calorias] +
            l * entrada[ingredientes[3]][calorias];
          if (valorCalorias !== 500) {
            continue;
          }
        }

        for (const propriedade of propriedades) {
          const valor = i * entrada[ingredientes[0]][propriedade] +
            j * entrada[ingredientes[1]][propriedade] +
            k * entrada[ingredientes[2]][propriedade] +
            l * entrada[ingredientes[3]][propriedade];
          produto *= valor > 0 ? valor : 0;
        }
        if (produto > resultado) {
          resultado = produto;
        }
      }
    }
  }
  return resultado;
}

const entrada = "input.txt";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));

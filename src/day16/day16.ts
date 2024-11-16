#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../../utils/utils.ts";

function solver(
  tias: parseDict,
  part: number,
  atributos: Record<string, number>,
): number {
  const greater = ["cats:", "trees"];
  const fewer = ["pomeranians:", "goldfish:"];
  for (const tia of Object.keys(tias)) {
    let flag = 0;
    for (const item of Object.keys(tias[tia])) {
      //console.log(item, atributos[item], tias[tia][item]);
      if (part === 1) {
        if (atributos[item] === tias[tia][item]) {
          flag++;
        }
      } else {
        if (greater.includes(item)) {
          if (atributos[item] < tias[tia][item]) {
            flag++;
          }
        } else if (fewer.includes(item)) {
          if (atributos[item] > tias[tia][item]) {
            flag++;
          }
        } else {
          if (atributos[item] === tias[tia][item]) {
            flag++;
          }
        }
      }
    }
    if (flag === 3) {
      return parseInt(tia);
    }
  }
  return -1;
}

const entrada = "input.txt";
const input: string = leArquivo(entrada, import.meta.url);
const inputParsed: parseDict = parsingDict(input, [2, 4, 6], [3, 5, 7], 1);

const tickerTape = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

const atributos: Record<string, number> = {};
tickerTape.split("\n").forEach((linha) => {
  const campo = linha.split(" ");
  atributos[campo[0]] = parseInt(campo[1]);
});

console.log("parte 1:", solver(inputParsed, 1, atributos));
console.log("parte 2:", solver(inputParsed, 2, atributos));

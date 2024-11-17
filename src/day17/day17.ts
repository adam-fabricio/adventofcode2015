#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo} from "../../utils/utils.ts";

function geraCombinacoes(
  lista: number[],
  valor: number[] = [0, 0],
  gerados: number[][] = [],
): number[][] {
  if (!lista.length) {
    return [];
  }
  lista.forEach((val, index) => {
    let [novoValor, recipientes] = valor;
    novoValor += val;
    recipientes++;
    gerados.push([novoValor, recipientes]);
    const restantes = [...lista.slice(index + 1)];
    geraCombinacoes(restantes, [novoValor, recipientes], gerados);
  });
  return gerados;
}

function solver(input: string, part: number) {
  const recipientes = input.split("\n").map((x) => parseInt(x));
  const combinacoesRecipientes = geraCombinacoes(recipientes);
  const litros = entrada.includes("test") ? 25 : 150;
  let combinacoes: number[][];
  if (part === 1) {
    combinacoes = combinacoesRecipientes.filter((x) => x[0] === litros);
  } else {
    const minimo = combinacoesRecipientes.reduce(
      (acc, x) => x[1] < acc && x[0] === litros ? x[1] : acc,
      Infinity,
    );
    combinacoes = combinacoesRecipientes.filter((x) =>
      x[0] === litros && x[1] === minimo
    );
  }
  return combinacoes.length;
}

const entrada = "input.txt";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));

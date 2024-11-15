#!/usr/bin/env -S deno run --allow-read --allow-write

const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url);
const input = Deno.readTextFileSync(filePath).trim();

interface mapaFelicidade {
  [pessoa: string]: {
    [vizinho: string]: number;
  };
}

export function solver(input: string, part: number) {
  const listaFelicidade: mapaFelicidade = {};
  for (const line of input.split("\n")) {
    const item = line.split(" ");
    if (!listaFelicidade[item[0]]) {
      listaFelicidade[item[0]] = {};
    }
    const ultimoNome = item[10].slice(0, -1);
    if (!listaFelicidade[ultimoNome]) {
      listaFelicidade[ultimoNome] = {};
    }
    const felicidade = parseInt(item[3]) * (item[2] === "gain" ? 1 : -1);

    listaFelicidade[item[0]][ultimoNome] =
      (listaFelicidade[item[0]][ultimoNome] | 0) + felicidade;
    listaFelicidade[ultimoNome][item[0]] =
      (listaFelicidade[ultimoNome][item[0]] | 0) + felicidade;
  }
  console.log(listaFelicidade);
}

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));

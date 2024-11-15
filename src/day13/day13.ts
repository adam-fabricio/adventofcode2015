#!/usr/bin/env -S deno run --allow-read --allow-write

const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url);
const input = Deno.readTextFileSync(filePath).trim();

interface mapaFelicidade {
  [pessoa: string]: {
    [vizinho: string]: number;
  };
}

export function solver(input: string, part: number): number {
  // Parsing da entrada saindo um dicionario.
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

  if (part === 2) {
    const tempListaPessoas = Object.keys(listaFelicidade);
    listaFelicidade["eu"] = {};
    for (const pessoa of tempListaPessoas) {
      listaFelicidade[pessoa]["eu"] = 0;
      listaFelicidade["eu"][pessoa] = 0;
    }
    // console.log(listaFelicidade);
  }

  // Gera a lista de possibilidades de pessoas sentadas.
  const listaPessoas: string[] = Object.keys(listaFelicidade);
  const listaPessoasSentadas: string[][] = [];
  const pessoasSentadas: string[] = [listaPessoas.pop() ?? ""];

  const pilha: [string[][]] = [[pessoasSentadas, listaPessoas]];
  while (pilha.length > 0) {
    const [pessoasSentadas, restantePessoas] = pilha.pop() ?? [[], []];
    if (restantePessoas.length === 0) {
      listaPessoasSentadas.push(pessoasSentadas);
    }
    restantePessoas.forEach((pessoa, index) => {
      const tempPessoasSentadas: string[] = [...pessoasSentadas, pessoa];
      const tempRestantePessoas: string[] = [
        ...restantePessoas.slice(0, index),
        ...restantePessoas.slice(index + 1),
      ];
      pilha.push([tempPessoasSentadas, tempRestantePessoas]);
    });
  }
  //ToDo: Calcular a felicidade.
  const valorFelicidade: number[] = [];

  listaPessoasSentadas.forEach((lista) => {
    const resultado = lista.reduce((acc, pessoa, index) => {
      if (index == lista.length - 1) {
        acc += listaFelicidade[lista[0]][pessoa];
      } else {
        acc += listaFelicidade[pessoa][lista[index + 1]];
      }
      return acc;
    }, 0);
    valorFelicidade.push(resultado);
  });
  return Math.max(...valorFelicidade);
}

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));

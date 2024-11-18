#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo  } from "../../utils/utils.ts";


interface interfaceGrid {
  [linha: number]: {
    [coluna: number]: number;
  };
}


function nextStep(grid: interfaceGrid, tamanho: number): interfaceGrid {
  const adjacentes = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ]
  const novoGrid: interfaceGrid = {}

  for (let linha = 0; linha < tamanho; linha++) {
    novoGrid[linha] = {};
    for (let coluna = 0; coluna < tamanho; coluna++){
      let on = 0;
      for (const adjacente of adjacentes) {
        const l = linha + adjacente[0];
        const c = coluna + adjacente[1];
        if (l < 0 || c < 0 || l === tamanho || c === tamanho) {
          continue;
        }
        on += grid[l][c];
      }
      if (grid[linha][coluna] === 1 && on !== 2 && on !== 3) {
        novoGrid[linha][coluna] = 0;
      } else if (grid[linha][coluna] === 0 && on === 3) {
        novoGrid[linha][coluna] = 1;
      } else {
        novoGrid[linha][coluna] = grid[linha][coluna];
      }
    }
  }
  return novoGrid
}

function printGrid(grid: interfaceGrid, tamanho: number){
  for (let linha = 0; linha < tamanho; linha++) {
    for (let coluna = 0; coluna < tamanho; coluna++){
      if (grid[linha][coluna] === 1) {
        process.stdout.write("#");
      } else {
        process.stdout.write(".");
      }
    }
    process.stdout.write("\n");
  }
}

function somaGrid(grid: interfaceGrid): number {
  let resultado = 0;
  for (const linha in grid) {
    for (const coluna in grid[linha]) {
      resultado += grid[linha][coluna];
    }
  }
  return resultado;
}

function solver(input: string, part: number, tamanho: number) {
  //parsing
  let grid: interfaceGrid = {};
  input.split("\n").forEach((linha, l_index) => {
    grid[l_index] = {}
    linha.split("").forEach((char, c_index) => {
      if (char === "#") {
        grid[l_index][c_index] = 1;
      } else {
        grid[l_index][c_index] = 0;
      }
    });
  });


  for (let step = 1; step <= 100; step++){
    if (part === 2) {
      grid[0][0] = 1;
      grid[0][99] = 1;
      grid[99][0] = 1;
      grid[99][99] = 1;
    }
    grid = nextStep(grid, tamanho);
  }
  if (part === 2) {
    grid[0][0] = 1;
    grid[0][99] = 1;
    grid[99][0] = 1;
    grid[99][99] = 1;
  }

  return somaGrid(grid);
}




const entrada = "input.txt";
const input: string = leArquivo(entrada, import.meta.url);
const tamanho = entrada.includes("test") ? 6 : 100;


console.log('parte 1:', solver(input, 1, tamanho));
console.log('parte 2:', solver(input, 2, tamanho));

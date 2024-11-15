#!/usr/bin/env -S deno run --allow-read --allow-write

const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url);
const input = Deno.readTextFileSync(filePath).trim();

export function solver(input: string, part: number) {
  const tempo = 2503;

  //parsin
  interface renasStatus {
    [nome: string]: {
      velocidade: number;
      autonomia: number;
      descanso: number;
      distancia: number;
      pontos: number;
      duracao: number;
    };
  }
  const renas: renasStatus = {};
  input.split("\n").forEach((linha) => {
    const campo = linha.split(" ");
    renas[campo[0]] = {
      velocidade: parseInt(campo[3]),
      autonomia: parseInt(campo[6]),
      descanso: parseInt(campo[13]),
      distancia: 0,
      pontos: 0,
      duracao: parseInt(campo[6]) + parseInt(campo[13]),
    };
  });

  if (part === 1) {
    const resultado: number[] = [];

    Object.values(renas).forEach((rena) => {
      const tempoCheio = Math.floor(tempo / (rena.autonomia + rena.descanso));
      const distanciaMedia = rena.autonomia * rena.velocidade;
      const distanciaCheia = tempoCheio * distanciaMedia;
      const tempoResto = tempo % (rena.autonomia + rena.descanso);

      let distanciaResto = 0;
      if (tempoResto > rena.autonomia) {
        distanciaResto = rena.velocidade * rena.autonomia;
      } else {
        distanciaResto = rena.velocidade * tempoResto;
      }
      resultado.push(distanciaResto + distanciaCheia);
    });
    return Math.max(...resultado);
  }
  
  for (let i = 0; i < tempo; i++) {
    Object.keys(renas).forEach(rena => {
      if ((i % renas[rena].duracao) < renas[rena].autonomia) {
        renas[rena].distancia += renas[rena].velocidade;
      }
    });
    const maiorDistancia = Math.max(...Object.values(renas).map(rena => rena.distancia));
    Object.keys(renas).forEach(rena => {
      if (renas[rena].distancia === maiorDistancia) {
        renas[rena].pontos += 1;
      }
    });
  }
  return Math.max(...Object.values(renas).map(rena => rena.pontos))
}

console.log("parte 1:", solver(input, 1));
console.log('parte 2:', solver(input, 2));

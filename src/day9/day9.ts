import { dirname, fromFileUrl, join } from "@std/path";

const __dirname = dirname(fromFileUrl(import.meta.url));
const file = join(__dirname, "input.txt");
const data = Deno.readTextFileSync(file);
const input = data.trim();

function calculaDistancia(
  localAtual: string,
  naoVisitado: string[],
  distancia: number,
  locais: Map<string, Map<string, number>>,
  distancias: number[],
): void {
  if (naoVisitado.length == 0) {
    distancias.push(distancia);
  } else {
    naoVisitado.forEach((proximaCidade) => {
      const subMap: Map<string, number> = locais.get(localAtual) as Map<
        string,
        number
      >;
      const distanciaProximaCidade: number = subMap.get(
        proximaCidade,
      ) as number;
      const distanciaAtualizada: number = distancia + distanciaProximaCidade;
      calculaDistancia(
        proximaCidade,
        naoVisitado.filter((cidade) => cidade !== proximaCidade),
        distanciaAtualizada,
        locais,
        distancias,
      );
    });
  }
}

export function solver(input: string, part: number) {
  const linhas = input.split("\n");
  const locais = new Map<string, Map<string, number>>();
  const distancias: number[] = [];

  linhas.forEach((linha) => {
    const linhaSplit = linha.split(" ");

    let subMap = locais.get(linhaSplit[0]);
    if (!subMap) {
      subMap = new Map();
    }
    subMap.set(linhaSplit[2], Number(linhaSplit[4]));
    locais.set(linhaSplit[0], subMap);

    subMap = locais.get(linhaSplit[2]);
    if (!subMap) {
      subMap = new Map();
    }
    subMap.set(linhaSplit[0], Number(linhaSplit[4]));
    locais.set(linhaSplit[2], subMap);
  });
  const cidades = Array.from(locais.keys());

  cidades.forEach((cidade) => {
    calculaDistancia(
      cidade,
      cidades.filter((thisCidade) => cidade != thisCidade),
      0,
      locais,
      distancias,
    );
  });
  // console.log(distancias);
  if (part === 1) {
    return Math.min(...distancias);
  } else {
    return Math.max(...distancias);
  }
}

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));

const adam = [1, 2, 4];
adam.forEach((a) => console.log(a));

import { readFileSync } from "fs";
import path from "path";

const file = path.join(__dirname, "input.txt");
const data = readFileSync(file, "utf-8");
const input = data.trim();

function parseInstructions(instruction: string): [string, number[], number[]] {
  const splitInstruction = instruction.split(" ");
  if (splitInstruction[0] === "turn") {
    return [
      splitInstruction[1],
      splitInstruction[2].split(",").map(Number),
      splitInstruction[4].split(",").map(Number),
    ];
  } else {
    return [
      splitInstruction[0],
      splitInstruction[1].split(",").map(Number),
      splitInstruction[3].split(",").map(Number),
    ];
  }
}

export function solver(input: string, part: number): number {
  const lights: number[][] = Array.from({ length: 1000 }, () =>
    Array(1000).fill(0)
  );
  input.split("\n").forEach((instruction) => {
    const instruct = parseInstructions(instruction);
    if (instruct[0] === "on") {
      for (let line = instruct[1][0]; line <= instruct[2][0]; line++) {
        for (let coluna = instruct[1][1]; coluna <= instruct[2][1]; coluna++) {
          part === 1 ? (lights[line][coluna] = 1) : (lights[line][coluna] += 1);
        }
      }
    } else if (instruct[0] == "off") {
      for (let line = instruct[1][0]; line <= instruct[2][0]; line++) {
        for (let coluna = instruct[1][1]; coluna <= instruct[2][1]; coluna++) {
          if (part === 1) {
            lights[line][coluna] = 0
          } else {
            lights[line][coluna] === 0 
            ? (lights[line][coluna] = 0) 
            : (lights[line][coluna] -= 1);
          }
        }
      }
    } else {
      for (let line = instruct[1][0]; line <= instruct[2][0]; line++) {
        for (let coluna = instruct[1][1]; coluna <= instruct[2][1]; coluna++) {
          if (part === 1) {
              lights[line][coluna] === 1
              ? (lights[line][coluna] = 0)
              : (lights[line][coluna] = 1);
          } else {
            (lights[line][coluna] += 2)
          }
        }
      }
    }
  });
  return lights.reduce(
    (acc, linha) => acc + linha.reduce((acc, coluna) => acc + coluna, 0),
    0
  );
}

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));

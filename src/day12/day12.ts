const fileName = "input.txt";
const filePath = new URL(fileName, import.meta.url).pathname;
const input = Deno.readTextFileSync(filePath).trim();

export function solver(input: string, part: number) {
  const regex: RegExp = /[-]?[0-9]+/g;
  const numeros: string[] = input.match(regex) as string[];
  const listResult: number[] = numeros.map(Number);
  const sumResult: number = listResult.reduce((acc, item) => acc + item, 0)
  if (part == 1) {
    return sumResult
  }
  // const redRegex: RegExp = /{.*?red.*?}/g;
  // const redRegex: regExp = /\{[^{}]*?"red"[^{}]*?\}/g;
  const redMatch: string[] = input.match(redRegex) as string[];
  
  let redNumber: number = 0

  redMatch.forEach(element => {
    const lNum: string[] = (element.match(regex) as string[] || ["0"]);
    console.log(element)
    console.log(lNum)
    const sumNum: number = lNum.map(Number).reduce((acc, item) => acc + item,0);
    redNumber += sumNum;
  });
  return sumResult - redNumber;
}

console.log('parte 1:', solver(input, 1));
console.log('parte 2:', solver(input, 2));
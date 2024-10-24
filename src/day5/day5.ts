import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "input.txt");
const data = readFileSync(filePath, "utf-8");
const input = data.trim();

export function solver(input: string, part: number) {
    const regexHasTwoPar = /(..).*\1/;
    const letterBetweenLetter = /(.).\1/;
    const letterTwice = /(.)\1/;
    const badSubString = /ab|cd|pq|xy/;
    const treeVowels = /[aeiou]/g;
    
    let nice = 0;

    input.split('\n').forEach((element, index) => {
        if ( part ===2 ) {
            const hasTowPar = regexHasTwoPar.test(element);
            const hasLetterBetweenLetter = letterBetweenLetter.test(element);
    
            if (hasTowPar && hasLetterBetweenLetter) {
                nice++
            }
        } else {
            const hasTreeVowels = (element.match(treeVowels) || []).length >= 3;
            const hasBadSubstring = badSubString.test(element);
            const hasLetterTwice = letterTwice.test(element);
            

            if (hasTreeVowels && !hasBadSubstring && hasLetterTwice) {
                nice ++
            }
        }
    });
        
    return nice
}

console.log(solver(input, 1));
console.log(solver(input, 2));

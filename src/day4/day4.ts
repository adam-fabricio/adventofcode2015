import { readFileSync } from "fs";
import md5 from "md5";
import path from "path";

const filePath = path.join(__dirname, "input.txt");
const data = readFileSync(filePath, "utf-8");
const input = data.trim();

export function solver(input: string, part: number){
    let md5_hash = '';
    let i = 0;
    const zeros = part === 1 ? 5 : 6;

    while ( ! md5_hash.startsWith('0'.repeat(zeros))){
        i++
        md5_hash = md5( input + i );
        
    }

    console.log(md5_hash, i);

}

solver(input, 1);
solver(input, 2);
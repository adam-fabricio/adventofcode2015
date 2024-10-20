import { readFileSync } from "fs";
import { areaDePapel } from "../src/day2/day2";
import path from "path";

describe('Day 2 - I Was Told There Would Be No Math', () => {
  it('square feet of wrapping paper', () => {
    const filePath = path.join(__dirname, '../src/day2/test.txt')
    const data = readFileSync(filePath, "utf-8");
    const input = data.trim()
    const expected = 43 +58 ;
    expect(areaDePapel(input, 1)).toBe(expected);
  });
  it('feet of ribbon', () => {
    const filePath = path.join(__dirname, '../src/day2/test.txt')
    const data = readFileSync(filePath, "utf-8");
    const input = data.trim()
    const expected = 34 + 14 ;
    expect(areaDePapel(input, 2)).toBe(expected);
  });
});

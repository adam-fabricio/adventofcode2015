import { readFileSync } from "fs";
import { solver } from "../src/day3/day3"
import path from "path";

describe("Day 3: Perfectly Spherical Houses in a Vacuum", () => {
    const filePath = path.join(__dirname, '../src/day3/test.txt')
    const data = readFileSync(filePath, "utf-8");
    const input = data.trim();

    it("Parte 1 - Houses Visited", () => {    
        const expected = 2;
        expect(solver(input, 1)).toBe(expected);
    });

    it("Parte 2: Casas Visitadas", () => {
        const expected = 11;
        expect(solver(input, 2)).toBe(expected)
    });
});
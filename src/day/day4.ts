import { readFileSync } from "fs";
import path from "path";

const filePath = path.join(__dirname, "input.txt");
const data = readFileSync(filePath, "utf-8");
const input = data.trim()

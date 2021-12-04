import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();


const input = loadFile()
  .split("\n");

const gammaBinary = input[0].split("")
  .map((_, index) => {
    const oneCount = input.reduce((acc, line) => acc + Number(line[index]), 0);
    return Number(oneCount >= input.length / 2);
  })
  .join("");

const gammaValue = parseInt(gammaBinary, 2);
const epsilonValue = (gammaValue >>> 0) ^ parseInt("1".repeat(gammaBinary.length), 2);

console.log(gammaValue * epsilonValue);

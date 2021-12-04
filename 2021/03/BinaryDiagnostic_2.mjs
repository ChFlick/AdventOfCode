import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();


const input = loadFile()
  .split("\n");

const countOnes = (arr, idx) => arr.reduce((acc, curr) => acc + (curr[idx] === "1" ? 1 : 0), 0);

let oxy = [...input];
for (let i = 0; oxy.length > 1; ++i) {
  const count = countOnes(oxy, i);
  const mostCommonBit = Number(count >= (oxy.length / 2));
  oxy = oxy.filter((line) => Number(line[i]) === mostCommonBit);
}

let co2 = [...input];
for (let i = 0; co2.length > 1; ++i) {
  const count = countOnes(co2, i);
  const leastCommonBit = Number(count < (co2.length / 2));
  co2 = co2.filter((line) => Number(line[i]) === leastCommonBit);
}

console.log(oxy, co2);
console.log(parseInt(oxy[0], 2) * parseInt(co2[0], 2));

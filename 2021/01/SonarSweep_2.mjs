import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString().trim();

const result =
  loadFile()
    .split("\n")
    .map(Number)
    .map((val, idx, arr) => val + arr[idx + 1] + arr[idx + 2])
    .slice(0, -2)
    .reduce((sum, curr, idx, arr) => curr > arr[idx - 1] ? sum + 1 : sum, 0);

console.log(result);

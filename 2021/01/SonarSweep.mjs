import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString().trim();

const result =
  loadFile()
    .split("\n")
    .map(Number)
    .reduce((sum, curr, idx, arr) => curr > arr[idx - 1] ? sum + 1 : sum, 0);

console.log(result);

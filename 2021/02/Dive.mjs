import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();

const commandMap = {
  "forward": ({ range, depth }, value) => ({ range: range + value, depth }),
  "down": ({ range, depth }, value) => ({ range, depth: depth + value }),
  "up": ({ range, depth }, value) => ({ range, depth: depth - value }),
};

const result =
  loadFile()
    .split("\n")
    .map(line => line.split(" "))
    .map(([command, value]) => ({ command, value: parseInt(value) }))
    .reduce((acc, { command, value }) => commandMap[command](acc, value), { range: 0, depth: 0 });

console.log(result);

console.log(result.range * result.depth);

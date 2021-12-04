import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();

const commandMap = {
  "forward": ({ range, depth, aim }, value) => ({ range: range + value, depth: depth + aim * value, aim }),
  "down": ({ range, depth, aim }, value) => ({ range, depth, aim: aim + value }),
  "up": ({ range, depth, aim }, value) => ({ range, depth, aim: aim - value }),
};

const result =
  loadFile()
    .split("\n")
    .map(line => line.split(" "))
    .map(([command, value]) => ({ command, value: parseInt(value) }))
    .reduce((acc, { command, value }) => commandMap[command](acc, value), { range: 0, depth: 0, aim: 0 });

console.log(result);

console.log(result.range * result.depth);

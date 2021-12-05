import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();


const commands = loadFile()
  .split("\n")
  .map(line => line.split(" -> ")
    .map(coordinate => coordinate.split(",")
      .map(Number),
    )
    .map(([x, y]) => ({ x, y })),
  )
  .map(([start, end]) => ({ start, end }));

const straightCommands = commands.filter(({ start, end }) => start.x === end.x || start.y === end.y);
const hitsByCoordinate = straightCommands.reduce((hitsByCoordinate, { start, end }) => {
  const lowerX = Math.min(start.x, end.x);
  const higherX = Math.max(start.x, end.x);
  for (let x = lowerX; x <= higherX; x++) {

    const lowerY = Math.min(start.y, end.y);
    const higherY = Math.max(start.y, end.y);
    for (let y = lowerY; y <= higherY; y++) {
      hitsByCoordinate[`${x},${y}`] = (hitsByCoordinate[`${x},${y}`] || 0) + 1;
    }
  }
  return hitsByCoordinate;
}, {});

const diagonalCommands = commands.filter(({ start, end }) => start.x !== end.x && start.y !== end.y);
diagonalCommands.forEach(({ start, end }) => {
  const xStep = start.x < end.x ? 1 : -1;
  const yStep = start.y < end.y ? 1 : -1;

  for (let x = start.x, y = start.y; x !== (end.x + xStep); x += xStep, y += yStep) {
    hitsByCoordinate[`${x},${y}`] = (hitsByCoordinate[`${x},${y}`] || 0) + 1;
  }
});

console.log(Object.values(hitsByCoordinate)
  .filter(count => count > 1).length);

// Print function
// for (let y = Math.min(...commands.map(({ start }) => start.y)); y <= Math.max(...commands.map(({ end }) => end.y)); y++) {
//   let row = "";
//   for (let x = Math.min(...commands.map(({ start }) => start.x)); x <= Math.max(...commands.map(({ end }) => end.x)); x++) {
//     if (hitsByCoordinate[`${x},${y}`] > 0) {
//       row += hitsByCoordinate[`${x},${y}`];
//     } else {
//       row += ".";
//     }
//   }
//   console.log(row);
// }

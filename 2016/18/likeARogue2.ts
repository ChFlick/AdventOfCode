const rowNumber = 400000;
const start = '.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.';

let lastRow = start.split('').map(c => c === '^');
let numberOfSafeTiles = lastRow.filter(isTrap => !isTrap).length;

for (let n = 0; n < rowNumber - 1; n++) {
    const lastRowPlusBoundaries = [false, ...lastRow, false];
    const nextRow: boolean[] = [];

    for (let i = 0; i < lastRow.length; i++) {
        const [left, center, right] = lastRowPlusBoundaries.slice(i, i + 3);
        const next =
            left && center && !right ||
            !left && center && right ||
            left && !center && !right ||
            !left && !center && right;
        nextRow.push(next);
    }

    numberOfSafeTiles += nextRow.filter(isTrap => !isTrap).length
    lastRow = nextRow;
}

console.log(numberOfSafeTiles);

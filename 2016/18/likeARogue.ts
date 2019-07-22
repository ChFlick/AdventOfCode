const rowNumber = 40;
const start = '.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.';

let trapField = [start.split('').map(c => c === '^')];

while (trapField.length < rowNumber) {
    const lastRow = trapField[trapField.length - 1];
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

    trapField.push(nextRow);
}

const numberOfSafeTiles = trapField.reduce((safeNum, row) => safeNum += row.filter(isTrap => !isTrap).length, 0);
console.log(numberOfSafeTiles);

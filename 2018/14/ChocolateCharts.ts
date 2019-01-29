const receipts = [3, 7];
let first = 0;
let second = 1;

for (let i = 0; i < 1824501; i++) {
    const next = receipts[first] + receipts[second];
    if (next > 9) {
        receipts.push(1);
        receipts.push(next - 10);
    } else {
        receipts.push(next);
    }

    first = (1 + first + receipts[first]) % receipts.length;
    second = (1 + second + receipts[second]) % receipts.length;
}

// console.log(receipts);
console.log(receipts.slice(824501, 824511).join(""));
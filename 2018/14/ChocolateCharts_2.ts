const receipts = [3, 7];
let first = 0;
let second = 1;

for (let i = 0; i < 15481843; i++) {
    const next = receipts[first] + receipts[second];
    if (next > 9) {
        receipts.push(1);
        receipts.push(next - 10);
    } else {
        receipts.push(next);
    }

    first = (1 + first + receipts[first]) % receipts.length;
    second = (1 + second + receipts[second]) % receipts.length;

    if (receipts.slice(-6).join("") === "824501") {
        console.log(receipts.length - 6);
        break;
    } else if (receipts.slice(-7, -1).join("") === "824501") {
        console.log(receipts.length - 7);
        break;
    }
}

// console.log(receipts);
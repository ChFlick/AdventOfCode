const input = 3012210;

const elves = "1".repeat(input).split('').map(e => parseInt(e));

while (elves.filter(e => e > 0).length !== 1) {
    for (let i = 0; i < elves.length; i++) {
        if(elves[i] === 0) {
            continue;
        }

        let nextElf = 0;
        for (let j = i + 1; (j % elves.length) !== i; j++) {
            if (elves[j % elves.length] > 0) {
                nextElf = j % elves.length;
                break;
            }
        }

        const nextElfPackets = elves[nextElf];
        elves[nextElf] = 0;
        elves[i] += nextElfPackets;
    }
}

console.log(elves.findIndex(e => e > 0) + 1); // + 1 as for the result array starts at 1

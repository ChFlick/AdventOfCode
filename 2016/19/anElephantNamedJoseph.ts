const input = 3012210;

const elves = "1".repeat(input).split('').map(e => parseInt(e));


while (elves.filter(e => e > 0).length > 1) {
    for (let i = 0; i < elves.length; i++) {
        if(elves[i] === 0) {
            continue;
        }

        const nextElf = ([...elves.slice(i + 1), ...elves.slice(0, i)].findIndex(elf => elf > 0) + i + 1) % elves.length;

        const nextElfPackets = elves[nextElf];
        elves[nextElf] = 0;
        elves[i] += nextElfPackets;
    }
}

console.log(elves.findIndex(e => e > 0));

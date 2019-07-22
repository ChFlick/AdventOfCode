const input = 3012210;

const elves = "1".repeat(input).split('').map(e => parseInt(e));

while (elves.filter(e => e > 0).length !== 1) {
    for (let i = 0; i < elves.length; i++) {
        if(elves[i] === 0) {
            continue;
        }

        const elvesWithPackets = elves.filter(e => e > 0).length;
        if ((input - elvesWithPackets) % 10000 === 0) {
            console.log(elvesWithPackets);
        }
        
        const oppositeNumber = Math.floor(elvesWithPackets / 2);

        let oppositeIndex = 0;
        let elfCount = 1;
        for (let j = i + 1; (j % elves.length) !== i; j++) {
            if (elfCount === oppositeNumber) {
                oppositeIndex = j % elves.length;
            }
            if (elves[j % elves.length] > 0) {
                elfCount++;
            }
        }

        const nextElfPackets = elves[oppositeIndex];
        elves[oppositeIndex] = 0;
        elves[i] += nextElfPackets;
    }
}

console.log(elves.findIndex(e => e > 0) + 1); // + 1 as for the result array starts at 1

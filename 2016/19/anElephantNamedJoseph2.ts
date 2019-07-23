const input = 3012210;

class Elf {
    pos: any;
    val: number;

    constructor(pos) {
        this.pos = pos;
        this.val = 1;
    }
}

function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
    list.pop();
}

let elves: Elf[] = [];
for (let i = 0; i < input; i++) {
    elves.push(new Elf(i + 1));
}

while (elves.length > 1) {
    for (let i = 0; i < elves.length; i++) {
        const elf = elves[i];
        const oppositeIndex = (Math.floor(elves.length / 2) + i) % elves.length;

        elf.val += elves[oppositeIndex].val
        spliceOne(elves, oppositeIndex);

        if (oppositeIndex < i) {
            i--;
        }

        if (elves.length % 10000 === 0) {
            console.log(elves.length);
        }
    };

}

console.log(elves);

function goalReached(floors: string[][]) {
    return floors[0].length === 0 && floors[1].length === 0 && floors[2].length === 0;
}

function isValid(floors: string[][]) {
    for (const floor of floors) {
        if (floor.find((val) => val[2] === "M" && !floor.includes(val.substr(0, 2) + "G") && !!floor.find(x => x[2] == "G"))) {
            return false;
        }
    }
    return true;
}

const seenSetups = new Set<string[][]>();
const floors = [["THG", "THM", "PLG", "STG"],
["PLM", "STM"],
["PRG", "PRM", "RUG", "RUM"],
[]];

seenSetups.add(floors);
console.log(goalReached(floors));
console.log(isValid(floors));




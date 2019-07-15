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

function floorsHash(floors: string[][]) {
    return floors.map(floor => floor.sort().join(" ")).join("-")
}

const seenSetups = new Map<string, number>();

let minSteps = 500;

const floors = [["THG", "THM", "PLG", "STG"],
["PLM", "STM"],
["PRG", "PRM", "RUG", "RUM"],
[]];

function findValidGoal(floors: string[][], elevatorFloor: number = 0, steps: number = 0) {
    if (steps > minSteps) { return; }

    if (!isValid(floors)) { return; }

    if (goalReached(floors)) {
        console.log("Goal reached");
        minSteps = Math.min(steps, minSteps);
        console.log(minSteps);
        return;
    }

    if (!seenSetups.has(floorsHash(floors)) || seenSetups.get(floorsHash(floors)) > steps) {
        seenSetups.set(floorsHash(floors), steps);
    } else {
        return;
    }

    const currentFloor = floors[elevatorFloor];
    const possibilities: string[][] = [];
    for (let i = 0; i < currentFloor.length; i++) {
        const first = currentFloor[i];
        possibilities.push([first]);
        for (let j = i + 1; j < currentFloor.length; j++) {
            possibilities.push([first, currentFloor[j]]);
        }
    }

    for (const possibility of possibilities) {
        const oldFloor = currentFloor.filter(ele => !possibility.includes(ele));

        if (elevatorFloor === 0) {
            setTimeout(findValidGoal, 0, [oldFloor, [...floors[1], ...possibility], floors[2], floors[3]], 1, steps + 1);
        }
        else if (elevatorFloor === 1) {
            setTimeout(findValidGoal, 0, [[...floors[0], ...possibility], oldFloor, floors[2], floors[3]], 0, steps + 1);
            setTimeout(findValidGoal, 0, [floors[0], oldFloor, [...floors[2], ...possibility], floors[3]], 2, steps + 1);
        }
        else if (elevatorFloor === 2) {
            setTimeout(findValidGoal, 0, [floors[0], [...floors[1], ...possibility], oldFloor, floors[3]], 1, steps + 1);
            setTimeout(findValidGoal, 0, [floors[0], floors[1], oldFloor, [...floors[3], ...possibility]], 3, steps + 1);
        }
        else if (elevatorFloor === 3) {
            setTimeout(findValidGoal, 0, [floors[0], floors[1], [...floors[2], ...possibility], oldFloor], 2, steps + 1);
        }

    }
}

findValidGoal(floors);
console.log(minSteps);
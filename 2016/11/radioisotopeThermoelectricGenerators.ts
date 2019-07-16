function goalReached(floors: string[][]) {
    return floors[0].length === 0 && floors[1].length === 0 && floors[2].length === 0;
}

function isValid(floors: string[][]) {
    for (const floor of floors) {
        if (floor.find((val) => val[2] === "M" &&
            !floor.includes(val.substr(0, 2) + "G") &&
            !!floor.find(x => x[2] == "G"))) {
            return false;
        }
    }
    return true;
}

function floorsHash(floors: string[][], elevatorFloor: number) {
    return floors.map(floor => floor.join("-")).join(" = ") + elevatorFloor;
}

const seenSetups = new Map<string, number>();

let minSteps = 100;

function findValidGoal(floors: string[][], elevatorFloor: number = 0, steps: number = 0) {
    if (steps >= minSteps) { return; }

    if (!isValid(floors)) { return; }

    floors.forEach(f => f.sort());

    if (!seenSetups.has(floorsHash(floors, elevatorFloor)) || seenSetups.get(floorsHash(floors, elevatorFloor)) > steps) {
        seenSetups.set(floorsHash(floors, elevatorFloor), steps);
    } else { return; }

    if (goalReached(floors)) {
        console.log("Goal reached");
        minSteps = Math.min(steps, minSteps);
        console.log(minSteps);
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

    for (const load of possibilities) {
        const currentFloorWithoutLoad = currentFloor.filter(ele => !load.includes(ele));

        switch (elevatorFloor) {
            case 0:
                findValidGoal([currentFloorWithoutLoad, [...floors[1], ...load], floors[2], floors[3]], elevatorFloor + 1, steps + 1);
                break;
            case 1:
                findValidGoal([floors[0], currentFloorWithoutLoad, [...floors[2], ...load], floors[3]], elevatorFloor + 1, steps + 1);
                findValidGoal([[...floors[0], ...load], currentFloorWithoutLoad, floors[2], floors[3]], elevatorFloor - 1, steps + 1);
                break;
            case 2:
                findValidGoal([floors[0], floors[1], currentFloorWithoutLoad, [...floors[3], ...load]], elevatorFloor + 1, steps + 1);
                findValidGoal([floors[0], [...floors[1], ...load], currentFloorWithoutLoad, floors[3]], elevatorFloor - 1, steps + 1);
                break;
            case 3:
                findValidGoal([floors[0], floors[1], [...floors[2], ...load], currentFloorWithoutLoad], elevatorFloor - 1, steps + 1);
                break;
        }
    }
}

// Example works
// const floors = [["LLM", "HHM"],
// ["HHG"],
// ["LLG"],
// []];

// Should be 25
// const floors = [["PPG", "PPM"],
// ["COG", "CUG", "PLG"],
// ["COM", "CUM", "PLM"],
// []];

// Should be 47
// const floors: string[][] = [["POG", "THG", "THM", "PRG", "RUG", "RUM", "COG", "COM"],
// ["POM", "PRM"],
// [],
// []];

// Should be 37
// const floors = [["STG", "STM", "PLG", "PLM"],
// ["THG", "RUG", "RUM", "CUG", "CUM"],
// ["THM"],
// []];

// My input V1
// const floors = [["THG", "THM", "PLG", "STG"],
// ["PLM", "STM"],
// ["PRG", "PRM", "RUG", "RUM"],
// []];

const floors = [["THG", "THM", "PLG", "STG", "ELG", "ELM", "DIG", "DIM"],
["PLM", "STM"],
["PRG", "PRM", "RUG", "RUM"],
[]];

findValidGoal(floors);
console.log(minSteps);
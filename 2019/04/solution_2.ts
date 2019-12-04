const start = 153517;
const end = 630395;

const adjacents = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString().repeat(2));
const hasAdjacents = (i: number) =>
    adjacents.reduce((res, curr) => {
        if (res === true) {
            return res;
        }
        const doubleIndex = i.toString().indexOf(curr.toString());
        if (doubleIndex === -1) {
            return false;
        }
        return i.toString()[doubleIndex - 1] !== curr[0] && i.toString()[doubleIndex + 2] !== curr[0];
    }, false);

const isIncreasing = (num: number) => {
    const nums = num.toString().split('').map(x => parseInt(x));
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) {
            return false;
        }
    }
    return true;
}

let n = 0;
for (let i = start; i < end; i++) {
    if (hasAdjacents(i) && isIncreasing(i)) {
        console.log(i);
        n++;
    }
}

console.log(n);

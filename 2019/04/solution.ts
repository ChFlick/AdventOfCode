const start = 153517;
const end = 630395;

const adjacents = [0,1,2,3,4,5,6,7,8,9].map(n => n.toString().repeat(2));
const hasAdjacents = (i: number) => adjacents.reduce((res, curr) => res || i.toString().includes(curr), false);
const isIncreasing = (num: number) => {
    const nums = num.toString().split('').map(x => parseInt(x));
    for(let i = 1; i < nums.length; i++) {
        if(nums[i - 1] > nums[i]) {
            return false;
        }
    }
    return true;
}

let n = 0;
for(let i = start; i < end; i++) {
    // console.log(hasAdjacents(i));
    // console.log(isIncreasing(i));

    if(hasAdjacents(i) && isIncreasing(i)) {
        n++;
    }
}

console.log(n);

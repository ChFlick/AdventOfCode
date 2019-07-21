const input = "10111100110001111";
const targetLength = 272;

const dragonize = (binarystr: string): string => binarystr + "0" + binarystr.split("").reverse().map(v => v === "0" ? "1" : "0").join("");
const makeDragonChecksum = (binarystr: string): string => binarystr.match(/../g).map(v => v[0] == v[1] ? "1" : "0").join("");

let dragonstring = input;
while(dragonstring.length < targetLength) {
    dragonstring = dragonize(dragonstring);
}

let dragonChecksum = makeDragonChecksum(dragonstring.substr(0, targetLength));
while (dragonChecksum.length % 2 === 0) {
    dragonChecksum = makeDragonChecksum(dragonChecksum);
}

console.log(dragonChecksum);

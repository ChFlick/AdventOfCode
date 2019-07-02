import * as crypto from 'crypto';

const input = "ugkcyxxp";
let password = "!!!!!!!!".split("");

let n = 0;
let i = 0;
while (n < 8) {
    const hash: string = crypto.createHash('md5').update(input + i).digest('hex');
    i++;
    if (hash.startsWith("00000") && hash.charAt(5).match(/\d/) && parseInt(hash.charAt(5)) < 8 && password[parseInt(hash.charAt(5))] === "!") {
        password[parseInt(hash.charAt(5))] = hash.charAt(6)
        n++;

        console.log(password);
    }
}

console.log(password.join(""));

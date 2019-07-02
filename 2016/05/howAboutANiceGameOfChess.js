"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const input = "ugkcyxxp";
let password = "";
let i = 0;
while (!(password.length === 8)) {
    const hash = crypto.createHash('md5').update(input + i).digest('hex');
    i++;
    if (hash.startsWith("00000")) {
        password += hash.charAt(5);
    }
}
console.log(password);

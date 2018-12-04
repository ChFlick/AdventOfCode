var fs = require("fs"),
    path = require("path"),
    filePath = path.join(__dirname, 'input.txt');

const guardRegExp = /#([0-9]+)/;
const guardSleepTimes = {};

let lines;
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        lines = data.split("\r\n");
        lines.sort((l1, l2) => {
            const d1 = parseDateString(l1);
            const d2 = parseDateString(l2);
            return (d1 > d2) - (d1 < d2);
        });

        let currentGuard = 0;
        let fellAsleepAt = 0;
        lines.forEach(line => {
            const guard = line.match(guardRegExp); 
            if(guard){
                currentGuard = guard[1];
                return;
            }

            if(line.endsWith("falls asleep")) {
                fellAsleepAt = parseDateString(line).getMinutes();
                return;
            }

            if(line.endsWith("wakes up")){
                const wokeUpAt = parseDateString(line).getMinutes();
                let heSleptAt = guardSleepTimes[currentGuard] || [];
                if(wokeUpAt > fellAsleepAt) {
                    for (let i = fellAsleepAt; i < wokeUpAt; i++) {
                        heSleptAt.push(i);
                    }
                } else {
                    for (let i = fellAsleepAt; i < 60; i++) {
                        heSleptAt.push(i);
                    }
                    for (let i = 0; i < wokeUpAt; i++) {
                        heSleptAt.push(i);
                    }
                }
                guardSleepTimes[currentGuard] = heSleptAt;
            }
        });

        let sleepyGuard = 0;
        let sleepyGuardTime = 0;
        Object.keys(guardSleepTimes).forEach(guardId => {
            if(guardSleepTimes[guardId].length > sleepyGuardTime) {
                sleepyGuard = guardId;
                sleepyGuardTime = guardSleepTimes[guardId].length;
            }
        });
        
        const sleepAmoutByMinute = guardSleepTimes[sleepyGuard].reduce((prev, curr) => {
            const sleptVal = prev[curr] || 0;
            prev[curr] = sleptVal + 1;
            return prev;
        }, {});

        let max = 0;
        let maxCount = 0;
        Object.keys(sleepAmoutByMinute).forEach(minute => {
            if(sleepAmoutByMinute[minute] > maxCount) {
                max = minute;
                maxCount = sleepAmoutByMinute[minute];
            }
        });

        console.log("Guard", sleepyGuard, "slept most in minute", max, "with an amout of", maxCount);
        console.log("Result =", sleepyGuard * max);

    } else {
        console.log(err);
    }
});


function parseDateString(line) {
    const dateString = line.substring(1,17).replace(" ", "T");
    const date = new Date(dateString);

    return date;
}
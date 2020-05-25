Array.prototype.diff = function (a) {return this.filter(function (i) {return a.indexOf(i) < 0;});};
const fs = require('fs');
let wordsArray = [];
fs.readFile("names.txt", {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        let stringArray = data;
        stringArray.toString;
        wordsArray = stringArray.split(/\r?\n/)
    }
});

function RandomWordWith(except) {
    let wordsArrayExcept = wordsArray.diff(except)
    wordsArrayExcept.pop()
    let id = getRandomInt(wordsArray.length - except.length);
    return wordsArrayExcept[id];
}

function RandomWord() {
    let id = getRandomInt(wordsArray.length);
    return wordsArray[id];
}

function WordChecker(name) {
    if (wordsArray.includes(name)) return true;
    else return false
}

function removeStringFromArray(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports.RandomWord = RandomWord;
module.exports.RandomWordWith = RandomWordWith;
module.exports.WordChecker = WordChecker;
module.exports.removeStringFromArray = removeStringFromArray;
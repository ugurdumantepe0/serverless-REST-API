'use strict';


var sortJsonArray = require('sort-json-array');

// returns true if object has items inside, returns false otherwise
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// this function gets a string and replaces all the target characters with replacement desired
function strReplace(string, target, replacement) {
    var i = 0, length = string.length;  
    for (i; i < length; i++) {    
      string = string.replace(target, replacement);    
    }
    return string;    
}

// splits the range into it's upper and lower bound and stores them in an array
function rangeSplitter (obj) {
    var ranges = obj.split('-');
    return ranges;
};

// todo/fix - if the attribute is missing for the object puts in the beginning of the array for descending and to the end for ascending
function sortChallenges(obj, sortAttribute, sortOrder) {
    sortJsonArray(obj, sortAttribute, sortOrder);
    return obj;
};

// this is another approach to sortByDifficulty by giving numerical weights to difficulties
// function sortChallengesByDifficulty(obj, sortOrder) {

//     obj.sort(function compareDifficulties(a, b) {
//         var difficultyWeights = {};
//         if (sortOrder === 'asc') {
//             difficultyWeights = { easy: 1, medium: 2, hard: 3 };
//         }
//         else (sortOrder === 'desc')
//         {
//             difficultyWeights = { easy: 3, medium: 2, hard: 1 };
//         }
//         //get both difficulty values
//         const diffWeightA = difficultyWeights[a.difficulty];
//         const diffWeightB = difficultyWeights[b.difficulty];
//         //return the difference
//         return diffWeightA - diffWeightB;
//     });
//     return obj;
// }

// sorts the challenges by difficulty by creating a new sorting order based on the indexes of a newly crated array
function sortChallengesByDifficulty(obj, sortOrder) {
    var difficulties = [];
    if (sortOrder === 'asc') {
        difficulties = ["easy", "medium", "hard"];
    }
    else if (sortOrder === 'desc')
    {
        difficulties = ["hard", "medium", "easy"];
    }
    obj.sort((a, b) => difficulties.indexOf(a.difficulty) - difficulties.indexOf(b.difficulty));
    return obj;
}

// A date sort function which ended up not being used
// function sortChallengesByCreationDate(obj, sortOrder) {

//     obj.sort(function compareCreatedAt(a, b) {
//         //parse createdAt as a date, then get timestamp
//         var timeA = new Date(a.createdAt).getTime();
//         var timeB = new Date(b.createdAt).getTime();
//         //return the difference
//         if (sortOrder === 'asc') {
//             return timeB - timeA;
//         }
//         else if (sortOrder === 'des') {
//             return timeA - timeB;
//         }
//     });
//     return obj;
// }

exports.isEmpty = isEmpty;
exports.strReplace = strReplace;
exports.rangeSplitter = rangeSplitter;
exports.sortChallenges = sortChallenges;
exports.sortChallengesByDifficulty = sortChallengesByDifficulty;

'use strict';


/**
 * Get board from Monday.com
 * Get board from Monday.com
 *
 * board String Monday board name
 * returns OutputSet
 **/
exports.boardGET = function(board) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Docs" : [ {
    "image" : "ben.png",
    "question" : "What was Ben Johnson's time in the 100M sprint championship that he won in 1986",
    "answer" : "A) 9.95 seconds",
    "choice5" : "E) 13.3 seconds",
    "choice3" : "C) 11.3 seconds",
    "category" : "SPORT",
    "choice4" : "D) 12.3 seconds",
    "choice1" : "A) 9.95 seconds",
    "choice2" : "B) 10.3 seconds"
  }, {
    "image" : "ben.png",
    "question" : "What was Ben Johnson's time in the 100M sprint championship that he won in 1986",
    "answer" : "A) 9.95 seconds",
    "choice5" : "E) 13.3 seconds",
    "choice3" : "C) 11.3 seconds",
    "category" : "SPORT",
    "choice4" : "D) 12.3 seconds",
    "choice1" : "A) 9.95 seconds",
    "choice2" : "B) 10.3 seconds"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


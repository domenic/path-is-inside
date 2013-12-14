"use strict";

var path = require("path");

module.exports = function (potentialChild, potentialParent) {
    // For inside-directory checking, we want to allow trailing slashes, so normalize.
    potentialChild = stripTrailingSep(potentialChild);
    potentialParent = stripTrailingSep(potentialParent);

    // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
    if (process.platform === "win32") {
        potentialChild = potentialChild.toLowerCase();
        potentialParent = potentialParent.toLowerCase();
    }

    return potentialChild.indexOf(potentialParent) === 0;
};

function stripTrailingSep(thePath) {
    if (thePath[thePath.length - 1] === path.sep) {
        return thePath.slice(0, -1);
    }
    return thePath;
}

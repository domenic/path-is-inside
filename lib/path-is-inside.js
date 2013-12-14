"use strict";

var path = require("path");

module.exports = function (potentialChild, potentialParent) {
    // For inside-directory checking, we want to allow trailing slashes, so normalize.
    potentialChild = path.normalize(potentialChild + path.sep);
    potentialParent = path.normalize(potentialParent + path.sep);

    // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
    if (process.platform === "win32") {
        potentialChild = potentialChild.toLowerCase();
        potentialParent = potentialParent.toLowerCase();
    }

    return potentialChild.indexOf(potentialParent) === 0;
};

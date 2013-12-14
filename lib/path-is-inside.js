"use strict";

var path = require("path");

module.exports = function (potentialChild, potentialParent) {
    return path.relative(potentialParent, potentialChild).indexOf("..") === -1;
};

"use strict";

var path = require("path");

module.exports = function (potentialChild, potentialParent) {
    var relative = path.relative(potentialParent, potentialChild);

    // If going from `potentialParent` to `potentialChild` means navigating up a directory, then `potentialChild` is
    // definitely not inside `potentialParent`.
    if (relative.indexOf("..") !== -1) {
        return false;
    }

    // But, if the paths are entirely unrelated, e.g. because they are on different drive letters, then `relative` will
    // just be `potentialChild`, up to normalization. In that case `potentialChild` is definitely not inside
    // `potentialParent` either, even though there were no up-a-directory navigations.
    if (path.normalize(relative + path.sep) === path.normalize(potentialChild + path.sep)) {
        return false;
    }

    return true;
};

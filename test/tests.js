"use strict";

var assert = require("assert");
var path = require("path");
var pathIsInside = require("..");

// The test data is in the form [thePath, potentialParent, expectedResult].

// For *nix-derived operating systems, we will test all these, plus all permutations with `/` appended, which should
// give the same result.
var nixTests = [
    ["/x/y/z", "/a/b/c", false],
    ["/x/y/z", "/x/y", true],
    ["/x/y/z", "/x/y/z", true],
    ["/x/y/z", "/x/y/z/w", false],
    ["/x/y/z", "/x/y/w", false],

    ["/X/y/z", "/x/y", false],
    ["/x/Y/z", "/x/y/z", false]
];

// For Windows, we will test all these, plus all permutations with `\` appended, plus all permutations with the drive
// letter lowercased.
var windowsTests = [
    ["C:\\x\\y\\z", "C:\\a\\b\\c", false],
    ["C:\\x\\y\\z", "C:\\x\\y", true],
    ["C:\\x\\y\\z", "C:\\x\\y\\z", true],
    ["C:\\x\\y\\z", "C:\\x\\y\\z\\w", false],
    ["C:\\x\\y\\z", "C:\\x\\y\\w", false],

    ["C:\\x\\y\\z", "D:\\x\\y\\z", false],
    ["C:\\x\\y\\z", "D:\\x\\y\\z\\w", false]
];

describe("*-nix style paths", function () {
    describe("process.platform = \"darwin\"", function () {
        before(function () {
            Object.defineProperty(process, "platform", { value: "darwin" });
            Object.defineProperty(path, "sep", { value: "/" });
        });

        nixTests.forEach(function (data) {
            runCase(data);
            runCase([data[0], data[1] + "/", data[2]]);
            runCase([data[0] + "/", data[1], data[2]]);
            runCase([data[0] + "/", data[1] + "/", data[2]]);
        });
    });

    describe("process.platform = \"linux\"", function () {
        before(function () {
            Object.defineProperty(process, "platform", { value: "linux" });
            Object.defineProperty(path, "sep", { value: "/" });
        });

        nixTests.forEach(function (data) {
            runCase(data);
            runCase([data[0], data[1] + "/", data[2]]);
            runCase([data[0] + "/", data[1], data[2]]);
            runCase([data[0] + "/", data[1] + "/", data[2]]);
        });
    });
});

describe("Windows-style paths", function () {
    before(function () {
        Object.defineProperty(process, "platform", { value: "win32" });
        Object.defineProperty(path, "sep", { value: "\\" });
    });

    describe("Uppercase drive letters", function () {
        windowsTests.forEach(runCases);
    });
    describe("Uppercase, then lowercase, drive letters", function () {
        windowsTests.forEach(function (data) {
            runCases([data[0], data[1].toLowerCase(), data[2]]);
        });
    });
    describe("Lowercase, then uppercase, drive letters", function () {
        windowsTests.forEach(function (data) {
            runCases([data[0], data[1].toLowerCase(), data[2]]);
        });
    });
    describe("Lowercase drive letters", function () {
        windowsTests.forEach(function (data) {
            runCases([data[0].toLowerCase(), data[1].toLowerCase(), data[2]]);
        });
    });

    function runCases(data) {
        runCase(data);
        runCase([data[0], data[1] + "\\", data[2]]);
        runCase([data[0] + "\\", data[1], data[2]]);
        runCase([data[0] + "\\", data[1] + "\\", data[2]]);
    }
});

function runCase(data) {
    specify("pathIsInside(\"" + data[0] + "\", \"" + data[1] + "\") should be " + data[2], function () {
        assert.strictEqual(pathIsInside(data[0], data[1]), data[2]);
    });
}

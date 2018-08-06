const path = require("path");
const sorter = require("path-sort").standalone("/");
const recursive = require("recursive-readdir");
const colors = require("colors");

const DIRECTORY = "src/";
const SPEC = ".spec";

function fileCheckMain(file, stats) {
    return fileCheck(file, stats, false);
}

function fileCheckTest(file, stats) {
    return fileCheck(file, stats, true);
}

function fileCheck(file, stats, isTest) {
    if (stats.isDirectory()) {
        return false;
    }
    if (path.extname(file) !== ".js" &&
        path.extname(file) !== ".jsx" &&
        path.extname(file) !== ".ts" &&
        path.extname(file) !== ".tsx") {
        return true;
    }
    if (isTest) {
        return file.endsWith(`${SPEC}${path.extname(file)}`) === false;
    } else {
        return file.endsWith(`${SPEC}${path.extname(file)}`) === true;
    }
}

recursive(DIRECTORY, [fileCheckMain], (errorMain, files) => {
    recursive(DIRECTORY, [fileCheckTest], (errorTest, tests) => {
        // Handle Empty Arrays
        files = files || [];
        tests = tests || [];
        // Create Result Lists
        const testsFound = [];
        const testsNeeded = [];
        // Check For Test Coverage
        for (const file of files) {
            let testFound = false;
            for (const test of tests) {
                if (`${path.dirname(file)}\\${path.basename(file, path.extname(file))}${SPEC}${path.extname(file)}` === test) {
                    testFound = true;
                }
            }
            if (testFound) {
                testsFound.push(file);
            } else {
                testsNeeded.push(file);
            }
        }
        // Display Results - Found
        console.log(`Files Covered By Unit Tests (${testsFound.length} / ${files.length})`);
        for (const testFound of testsFound.sort(sorter)) {
            console.log(`- ${colors.green(testFound)}`);
        }
        console.log();
        // Display Results - Needed
        console.log(`Files Requiring Unit Tests (${testsNeeded.length} / ${files.length})`);
        for (const testNeeded of testsNeeded.sort(sorter)) {
            console.log(`- ${colors.yellow(testNeeded)}`);
        }
        console.log();
    });
});

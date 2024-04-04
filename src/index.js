const fs = require("fs");
const path = require("path");

/**
    Removes all the "" (whitespaces) values from the array
    and trims all the trailing spaces from list items

    @param {string[]} lines - Array of lines
    @returns {string[]} - Array of lines without white spaces
*/
function filterWhiteSpaces(lines) {
  return lines.filter((line) => line.trim() !== "").map((l) => l.trim());
}

/**
    Reads the file and returns lines as array items

    @param {string} filename - Name of the file
    @returns {string[]} - Array of lines
*/
function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");

    if (!data) {
      throw new Error(
        "Either there are no content in the file or file doesn't exists",
      );
    }

    const lines = data.split(/[\r\n]+/);

    const filteredLines = filterWhiteSpaces(lines);

    return filteredLines;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

/**
    Matches the search terms against each line of the data file

    @param {string} dataFileName - Name of the data file
    @param {string} termsFileName - Name of the search term file
    @returns {number} - returns average number of lines that contains a search term
    @throws {Error} - If file not found or data file is empty
*/
function calculateAverageNumberOfLines(dataFileName, termsFileName) {
  try {
    let searchCounter = new Map();
    let counter = 0;

    const searchTerms = readFile(termsFileName);
    const data = readFile(dataFileName);

    // matches if any of the terms are present in the line
    searchTerms.forEach((term) => searchCounter.set(term, 0));

    data.forEach((line) => {
      searchTerms.forEach((term) => {
        const searchPattern = new RegExp(term);
        if (searchPattern.test(line)) {
          searchCounter.set(term, searchCounter.get(term) + 1);
        }
      });
    });

    let totalLinesMatched = 0;
    searchCounter.forEach((count) => (totalLinesMatched += count));

    return totalLinesMatched / searchTerms.length;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

/**
 * Prints the result on the console
 *
 * @param {number} average - result
 */
function printResult(average) {
  console.log("\n|------------------------------|\n|\tOUTPUT\t\t       |");
  console.log("|------------------------------|");
  console.log(`| average number of lines ${average} |`);
  console.log("|------------------------------|\n");
}

/**
    Main Method

    @param {string} [data="Data.txt"] - Name of the data file. Defaults to "Data.txt" if not provided
    @param {string} [search="SearchTerms.txt"] - Name of the search term file. Defaults to "SearchTerms.txt" if not provided
    @throws {Error} - If there is an error executing the main function
*/
function main(data = "Data.txt", search = "SearchTerms.txt") {
  try {
    const parentDir = path.dirname(__filename);
    const dataPath = path.join(parentDir, "data", data);
    const searchPath = path.join(parentDir, "data", search);

    const average = calculateAverageNumberOfLines(dataPath, searchPath);

    printResult(average);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

main();

module.exports = { filterWhiteSpaces, readFile, calculateAverageNumberOfLines };

const fs = require("fs");
const path = require("path");
const {
  filterWhiteSpaces,
  readFile,
  calculateAverageNumberOfLines,
} = require("../src/index.js");

describe("filter whitespaces function", () => {
  it("should remove all the elements containing only whitespace", () => {
    const lines = ["earth", "moon", "sun", ""];
    const filteredLines = filterWhiteSpaces(lines);
    expect(filteredLines.length).toEqual(3);
  });

  it("should clean all the whitespaces from each line", () => {
    const lines = ["earth ", " moon    ", "", "sun   "];
    const filteredLines = filterWhiteSpaces(lines);
    expect(filteredLines.length).toEqual(3);
    expect(filteredLines).toEqual(["earth", "moon", "sun"]);
  });
});

describe("get search terms function", () => {
  it("should return an array of search terms from the given file", () => {
    const searchTermsPath = path.join(
      __dirname,
      "..",
      "src",
      "data",
      "TestSearchTerms.txt",
    );
    const searchTerms = readFile(searchTermsPath);

    expect(searchTerms).toEqual(["L", "TV"]);
  });
});

describe("calculate average number of lines function", () => {
  it("should return 1.5 as 3 are the matched lines and 2 are the number of searched terms", () => {
    const testDataPath = path.join(__dirname, "..", "src", "data", "TestData.txt");
    
    const testSearchPath = path.join(
      __dirname,
      "..",
      "src",
      "data",
      "TestSearchTerms.txt",
    );

    const average = calculateAverageNumberOfLines(testDataPath, testSearchPath);
    expect(average).toEqual(1.5);
  });

  it("should throw an error if the input filename is wrong", () => {
    try {
      const average = calculateAverageNumberOfLines("Error.txt", "Error.txt");
    } catch (err) {
      expect(err.message).toEqual(
        "ENOENT: no such file or directory, open 'Error.txt'",
      );
    }
  });
});

// https://github.com/Data-Wrangling-with-JavaScript/Chapter-8/blob/master/vm-with-sample-db/db-init.js#L24


"use strict";

const papa = require('papaparse');
const fs = require('browserify-fs');
const level =  require('level-filesystem')
const quotesFile = $("#quotesFile")

function read (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8",
            function (err, textFileData) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

//
// Helper function to import a CSV file.
//
function importCsvFile (filePath) {
	return read(filePath)
		.then(textFileData => {
			const result = papa.parse(textFileData, {
				header: true,
				dynamicTyping: true,
				
			});
			console.log(result.data)
			return result.data;
		});
};
// console.log("quotes", quotes)
let filePath = "quotes"
let result = importCsvFile(filePath);
// console.log(result.meta.delimeter)
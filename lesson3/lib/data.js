/*
 *
 * This file will be use for storing data and editing data
 * 
 */

const fs = require('fs'),
    path = require('path'),
    helpers = require('./helpers');

let lib = {};
// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');
/**
 * @param  {} dir
 * @param  {} file
 * @param  {} data
 * @param  {} callback
 */
lib.create = (dir, file, data, callback) => {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            let stringData = JSON.stringify(data);
            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if (!err) {
                    fs.close(fileDescriptor, function(err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('could not create new file, it may already exist');
        }
    });
};

/**
 * @param  {} dir
 * @param  {} file
 * @param  {} callback
 */
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function(err, data) {
        // if (!err & data) {
        //     let parseData = helpers.parseJsonToObject(data);
        // }
        console.log('read');
        callback(err, data);
    });
};

// Update data inside a file
/**
 * @param  {} dir
 * @param  {} file
 * @param  {} data
 * @param  {} callback
 */
lib.update = (dir, file, data, callback) => {
    let fileLoc = lib.baseDir + dir + '/' + file + '.json';
    fs.open(fileLoc, 'r+', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            let stringData = JSON.stringify(data);
            fs.truncate(fileDescriptor, function(err) {
                if (!err) {
                    // write a file and close
                    fs.writeFile(fileDescriptor, stringData, function(err) {
                        if (!err) {
                            fs.close(fileDescriptor, function(err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('there was an error closing the file');
                                }
                            });
                        } else {
                            callback('error writing to existing file');
                        }
                    })
                } else {
                    callback('error truncating a file');
                }
            })
        } else {
            callback('could not be update the file, file does not exist')
        }
    })
};
/**
 * @param  {} dir
 * @param  {} file
 * @param  {} callback
 */
lib.delete = (dir, file, callback) => {

    // Open the file for writing
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            callback(false);
        } else {
            callback('Could not be delete');
        }

    });


};
module.exports = lib;
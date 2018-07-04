const { readFile, writeFile } = require('./stream') //module for ready and writting files
const { geocodeGoogle } = require('./geocode') //module for geocodification
const { linearDistance, printProgress, decodeBounds } = require('./utils') //module for general utils

require('dotenv').config();

const geocode = async (argument) => {

    let inputSchoolFile;
    let inputTeacherFile;
    let outputSchoolFile;
    let outputTeacherFile;
    let schools = [];
    let inputLine = [];


    if (argument.inputSchoolFile.length <= 0) {

        console.error('Input school file is required');
        return;
    }
    if (argument.outputSchoolFile.length <= 0) {
        console.error('Outfile school is required');
        return;
    }

    if (argument.inputTeacherFile.length <= 0) {

        console.error('Input teacher file is required');
        return;
    }
    if (argument.outputTeacherFile.length <= 0) {
        console.error('Outfile teacher is required');
        return;
    }

    argument.inputSchoolFile = '/vizonomy/teachers_pernambuco.csv'
    argument.outputSchoolFile = '/vizonomy/out/teachers_pernambuco.csv'

/*
    //SCHOOLS
    inputSchoolFile = readFile(argument.inputSchoolFile).split(/\r?\n/); //split the file in lines
    let error1, error2, distance, lat, lng, precision, originalAddress, message;
    outputSchoolFile = 'School MEC Code,School X-Coord,School Y-Coord, Geolocation-Level, google Status, Original Address, Google Address, googleType, cycle,bound  \r\n';
    for (i = 0; i < inputSchoolFile.length; i++) {
        try {
            printProgress('Processing ' + i, inputSchoolFile.length - 1);
            error1 = error2 = distance = lat = lng = precision = originalAddress = message = googleResponse = googleType = null;
            inputLine = inputSchoolFile[i].split(',');
            //code for geocoding the teacher address
            var bound = decodeBounds(inputLine[9]);
            await geocodeGoogle(inputLine[1], inputLine[2], inputLine[3], inputLine[5], inputLine[6], inputLine[7], inputLine[8], bound).then((result) => {
                if (result) {
                    lat = result.latitude;
                    lng = result.longitude;
                    precision = result.precision;

                    googleAddress = result.googleAddress.replace(/,/g, " - ");;
                    bound = result.bound
                    googleStatus = result.googleStatus
                    googleType = result.googleType
                    inputAddress = result.inputAddress
                    cycle = result.cycle
                    //var school = { "id": inputLine[0], "lat": lat, "lng": lng };
                    //schools.push(school);
                }
            }

            ).catch((err) => {
                error1 = err;
                console.log(' An error ocurred. See generated file for more information.');
            })
            //if there are not any error 
            if (!error1 && !error2) {
                if (originalAddress) {
                    outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + lat + ',' + lng + ',' + precision + ',' + googleStatus + ',' + inputAddress + ',' + googleAddress + ',' + googleType + ',' + cycle + ',' + bound + '\r\n';
                    //console.log(inputLine[0] + ',' + lat + ',' + lng + ',' + precision+ ','+ message + ','+ originalAddress );
                }
                else {
                    outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + lat + ',' + lng + ',' + precision + ',' + googleStatus + ',' + inputAddress + ',' + googleAddress + ',' + googleType + ',' + cycle + ',' + bound + '\r\n';
                    //console.log(inputLine[0] + ',' + lat + ',' + lng + ',' + precision+ ','+ message + ','+ originalAddress );
                }

            }
            else {
                //log the error per teacher and school
                outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + 'ERROR FORMAT' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + '\r\n';

            }
        }
        catch (ee) {
            outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + 'ERROR FORMAT' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + '\r\n';

        }
    }

    console.log('\nWriting school outfile');
    //write final file in binary, you can modify the format for utf-8 or utf-16
    writeFile(argument.outputSchoolFile, outputSchoolFile, { encoding: 'utf-8' });
    console.log('\nDone 😀');
    //END SCHOOLS
*/
    
    //TEACHER
    inputSchoolFile = readFile(argument.inputSchoolFile).split(/\r?\n/); //split the file in lines
    let error1, error2, distance, lat, lng, precision, originalAddress, message;
    outputSchoolFile = 'Teacher MEC Code,Teacher X-Coord,Teacher Y-Coord, Geolocation-Level, google Status, Original Address, Google Address, googleType, cycle,bound,distance  \r\n';
    for (i = 0; i < 50; i++) {
        try {
            printProgress('Processing ' + i, inputSchoolFile.length - 1);
            error1 = error2 = distance = lat = lng = precision = originalAddress = message = googleResponse = googleType = null;
            inputLine = inputSchoolFile[i].split(',');
            //code for geocoding the teacher address
            var bound = decodeBounds(inputLine[11]);
            await geocodeGoogle(inputLine[0], inputLine[3], inputLine[4], inputLine[6], inputLine[9], inputLine[7], inputLine[8], bound).then((result) => {
                if (result) {
                    lat = result.latitude;
                    lng = result.longitude;
                    precision = result.precision;

                    googleAddress = result.googleAddress.replace(/,/g, " - ");;
                    bound = result.bound
                    googleStatus = result.googleStatus
                    googleType = result.googleType
                    inputAddress = result.inputAddress
                    cycle = result.cycle
                    //var school = { "id": inputLine[0], "lat": lat, "lng": lng };
                    //schools.push(school);
                }
            }

            ).catch((err) => {
                error1 = err;
                console.log(' An error ocurred. See generated file for more information.');
            })
            //if there are not any error 
            if (!error1 && !error2) {
                if (originalAddress) {
                    outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + lat + ',' + lng + ',' + precision + ',' + googleStatus + ',' + inputAddress + ',' + googleAddress + ',' + googleType + ',' + cycle + ',' + bound +','+ '\r\n';
                    //console.log(inputLine[0] + ',' + lat + ',' + lng + ',' + precision+ ','+ message + ','+ originalAddress );
                }
                else {
                    outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + lat + ',' + lng + ',' + precision + ',' + googleStatus + ',' + inputAddress + ',' + googleAddress + ',' + googleType + ',' + cycle + ',' + bound +','+ '\r\n';
                    //console.log(inputLine[0] + ',' + lat + ',' + lng + ',' + precision+ ','+ message + ','+ originalAddress );
                }

            }
            else {
                //log the error per teacher and school
                outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + 'ERROR FORMAT' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' +','+ '\r\n';

            }
        }
        catch (ee) {
            outputSchoolFile = outputSchoolFile + inputLine[0] + ',' + 'ERROR FORMAT' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' + ',' + '' +','+ '\r\n';

        }
    }

    console.log('\nWriting school outfile');
    //write final file in binary, you can modify the format for utf-8 or utf-16
    writeFile(argument.outputSchoolFile, outputSchoolFile, { encoding: 'utf-8' });
    console.log('\nDone 😀');
}

module.exports = { geocode }
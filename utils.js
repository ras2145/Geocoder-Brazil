var decode = require('geojson-bounds');

const deg2rad = function (degrees) {
    return degrees * Math.PI / 180;
};


const linearDistance = (lon1, lat1, lon2, lat2, units) => {

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    var miles = d / 1.609344;

    if (units == 'km') {
        return d;
    } else {
        return miles;
    }

}

const printProgress = (current, total) => {
    process.stdout.write("\r\x1b[K")
    process.stdout.write(current + '/' + total);

}

const decodeBounds = (coordinates) => {
    try {


        var coor = coordinates.replace(/;/g, ',');
        var shape = {
            "type": "Polygon",
            "coordinates": JSON.parse(coor)
        }

        var west = decode.xMin(shape)
        // => 100.1

        var east = decode.xMax(shape)
        // => 101

        var south = decode.yMin(shape)
        // => 0.1

        var north = decode.yMax(shape)
        // => 1

        return { 'south': south, 'west': west, 'north': north, 'east': east };
    } catch (err) {
        throw (err);
    }
}


module.exports = { linearDistance, printProgress, decodeBounds }
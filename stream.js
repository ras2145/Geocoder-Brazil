const fs = require('fs');
const iconv = require('iconv-lite');
require('dotenv').config();


const readFile = (path) => {
    //use format conversion or plain format
    let contents = fs.readFileSync(path, { encoding: 'utf-8' });
    if (process.env.INTERNAL_ENCODING == 'IGNORE')
        return contents

    else
        return iconv.decode(new Buffer(contents), process.env.INTERNAL_ENCODING);
}


const writeFile = (path, content, options) => {
    fs.writeFileSync(path, content, options)
}

module.exports = { readFile, writeFile }
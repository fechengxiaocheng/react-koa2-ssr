let fs = require('fs');
let join = require('path').join;

export default function findSync(startPath) {
    let result = [];
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(val);
        });

    }
    finder(startPath);
    return result;
}
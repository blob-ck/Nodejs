//sunday01ex10_fs_pipe.js

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';
//var inname = __dirname + '/output.txt';
//var outname = __dirname + '/output2.txt';

fs.exists(outname, function(exists) {
    if(exists) {
        fs.unlink(outname, function(err) {
            if(err) throw err;
            console.log(`기존파일 ${outname} 삭제 완료!`);
        });
    }
    var infile = fs.createReadStream(inname, {flags : 'r'});
    var outfile = fs.createWriteStream(outname, {flags : 'w'});
    infile.pipe(outfile);
});





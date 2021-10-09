// this file is not used


const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../../../../public/assets/uploads');

const read_uploads_filelist = function () {
  var return_value;
  return_value = new Promise((resolve, reject) =>  {
    return fs.readdir(directoryPath, (err, filelist) => {     // read uploaded files and put into res.render
      if (filelist != undefined) {
        filelist.forEach(file => {
          console.log(file);
        });
        // console.log('directoryPath:', directoryPath);
        // console.log('files:', filelist);
        resolve (filelist);
      } else {
        console.log(err, " :(err) file list is not transmitted");
        console.log('directoryPath:', directoryPath);
        reject (err);
      }
    })
  })
  // console.log('return:',return_value);
  return return_value;
}

module.exports = read_uploads_filelist;
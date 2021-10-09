const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../../public/assets/uploads');

exports.index = (req, res) => {
  fs.readdir(directoryPath, (err, files) => {     // read uploaded files and put into res.render
    if (files != undefined) {
      files.forEach(file => {
        console.log(file);
      });
      console.log('file list is sent');
      res.render('masterdata/materialmaster', {filelist:files});
    } else {
      console.log("Error: file list is not transmitted");
      res.render('masterdata/materialmaster');
    }
  });

};


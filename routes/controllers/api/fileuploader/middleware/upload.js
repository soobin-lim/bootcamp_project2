// this is for uploading every files into public/assets/uploads

const util = require("util");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;

// multer storage
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/assets/uploads/");    // __basedir is necessary and it works fine
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);        // maybe I can modify this filename
    cb(null, AddTimeStampToFileName(file.originalname));        // maybe I can modify this filename (adding date)
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;


function AddTimeStampToFileName(targetString) {
  
  var date = new Date();
  var time_stamp;

  time_stamp =(date.getFullYear() + 
  ("0" + (date.getMonth() + 1)).slice(-2) + 
  ("0" + date.getDate()).slice(-2) + 
  ("0" + date.getHours()).slice(-2) + 
  ("0" + date.getMinutes()).slice(-2) + 
  ("0" + date.getSeconds()).slice(-2));

  for(var i = targetString.length -1; i>=0; i--){
    
    if(targetString[i]=="."){
      // targetString[i]= val+".";
      var filename = targetString.substr(0,i);
      var extension = targetString.substr(i,targetString.length);
      
      time_stamp = filename + time_stamp + extension;
      break;
    }
  }
  return time_stamp;
}
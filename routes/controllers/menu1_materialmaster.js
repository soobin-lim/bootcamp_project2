// const path = require('path');
// const fs = require('fs');
// const directoryPath = path.join(__dirname, '../../public/assets/uploads');
const render_material_master = require('./api/materialmaster');
// console.log('menu1');
exports.index = render_material_master;

// function AddTimeStampToFileName(targetString) {
  
//   var date = new Date();
//   var time_stamp;

//   time_stamp =(date.getFullYear() + 
//   ("0" + (date.getMonth() + 1)).slice(-2) + 
//   ("0" + date.getDate()).slice(-2) + 
//   ("0" + date.getHours()).slice(-2) + 
//   ("0" + date.getMinutes()).slice(-2) + 
//   ("0" + date.getSeconds()).slice(-2));

//   for(var i = targetString.length -1; i>=0; i--){
    
//     if(targetString[i]=="."){
//       // targetString[i]= val+".";
//       var filename = targetString.substr(0,i);
//       var extension = targetString.substr(i,targetString.length);
      
//       time_stamp = filename + time_stamp + extension;
//       break;
//     }
//   }
//   return time_stamp;
// }
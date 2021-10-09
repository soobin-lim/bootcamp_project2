const db = require('../../../../models/index.js'); // import a db
const path = require('path');
// const KiaMaterial = db.tutorials
const read_excel_kia_material_master_schema = require('./read_excel_kia_material_master_schema');
const KiaMaterial = db.KiaMaterial; //db.KiaMaterial

// const readXlsxFile = require("read-excel-file/node");

const uploadkiamaterials = async (req, res) => {

  // if (req.file == undefined) {
  //   return res.status(400).send("Req.file is undefined");
  // }
  console.log(req.body, "this is kiamaterial_sync_find -> Only excel file is allowed");

  const filename = req.body.filename;
  if (filename.includes('xlsx') || filename.includes('xls')) {
    console.log('it includes xlsx or xls');
  } else {
    res.status(500).send({ message: "It is not an excel file", err: error.message });
  }

  let excel_file_path =
    path.join(__dirname + "../../../../../public/assets/uploads/" + req.body.filename);

  console.log(excel_file_path)
  let resolved_excel_file_data = await myfunction(excel_file_path);  // pending (Promise)
  console.log(resolved_excel_file_data);
  try{
    await db.KiaMaterial.bulkCreate(resolved_excel_file_data)
    .then(() => {
      res.status(200).send({
        message: "Sync(KiaMaterial) is finished: "
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    });
  } catch(err){
    console.log(err);
  }
}


const myfunction = async function (excel_file_path) {
  var retrived_data;
  try {
    var jsondata = await Promise.resolve(read_excel_kia_material_master_schema(excel_file_path)).
      then(function (result) {
        // console.log('result type', typeof result);
        // console.log(result.rows[result.rows.length-1]);   //504 materials..
        retrived_data = result.rows;  //array
        //pass a array[object, object]
        return retrived_data;
      })
  } finally {
    console.log('done');
    // console.log(jsondata);
    return jsondata;
  }
}




//     .then((rows) => {    // doesn't read value kindly
//       // skip header
//       rows.shift();
//       // console.log(rows);
//       let kiamaterials = [];

//       rows.forEach((row) => {
//         console.log(row)
//         let kiamaterial = {
//           material: row[0],
//           sapmaterial: row[1],
//           description: row[2],
//           pac: row[3],
//         };

//         kiamaterials.push(kiamaterial);
//       });
//       // console.log(kiamaterials);
//       KiaMaterial.bulkCreate(kiamaterials)
//         .then(() => {
//           res.status(200).send({
//             message: "Sync(KiaMaterial) is finished: "
//           });
//         })
//         .catch((error) => {
//           res.status(500).send({
//             message: "Fail to import data into database!",
//             error: error.message,
//           });
//         });
//     }).catch(err => console.log(err));
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Could not upload the file: " + req.body.filename,
//     });
//   }
// };

const getKiaMaterials = (req, res) => {
  KiaMaterial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

module.exports = {
  uploadkiamaterials,
  getKiaMaterials,
};
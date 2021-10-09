const schema = {
  'Material': {
    prop: 'material',
    type: String,
    required: true
  },
  'Material Description': {
    // JSON object property name.
    prop: 'description',
    type: String,
  },
  'Part Group No.': {
    prop: 'pgn',
    type: String,
  },
  'PGN Description': {
    prop: 'pgndescription',
    type: String,
  },
  'Part Assembly Code': {
    prop: 'pac',
    type: String,
    required: true
  },
  'Car Model': {
    prop: 'carmodel',
    type: String,
  },
  'Packing Quantity': {
    prop: 'standardpack',
    type: Number,
  },
}

const read_excel = function (filePathAndName) {
  const readXlsxFile = require('read-excel-file/node');
  try {
    return readXlsxFile(filePathAndName, { schema })
      .then((rows, errors) => {
        if (!errors) {
          // `rows` is an array of rows
          // each row being an array of cells.
          // console.log(rows);
          return rows;
        } else {
          return errors;
        }
      })
  } catch (err) {
    // console.log(err);
    return err;
  }
}
module.exports = read_excel;

// const read_excel_kia_material_master_schema = function (filename) {
//   var retrived_data;
//   try {
//     var jsondata = Promise.resolve(read_excel(filename));

//     // jsondata.then(function (data) {
//     //   // console.log(JSON.stringify(data)); //working good..
//     //   kiacode = JSON.stringify(data);
//     jsondata.then(function (result) {
//       // console.log('result type', typeof result);
//       // console.log(result.rows[result.rows.length-1]);   //504 materials..
//       retrived_data = result.rows;  //array
//       //pass a array[object, object]
//       return retrived_data;
//     });

//     // }, function (err) {
//     //   console.log(err);
//     //   res.render("Reading excel file failed");
//     // });
//   } catch (err) {
//     console.log(err);
//     return err;

//   }
// }

// module.exports = read_excel_kia_material_master_schema;
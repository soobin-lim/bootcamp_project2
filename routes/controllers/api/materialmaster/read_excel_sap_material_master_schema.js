const schema = {
  'Status': {
    prop: 'status',
    type: String,
    required: false,
  },
  'Material': {
    prop: 'material',
    type: String,
    required: false,
  },
  'SAPMaterial': {
    prop: 'sapmaterial',
    type: String,
    required: true,
    primaryKey: true,
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
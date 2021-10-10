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
module.exports = function () {

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

  const readXlsxFile = require('read-excel-file/node');
  try {
    return readXlsxFile(__dirname + '/excelfiles/materialmaster.xlsx', { schema })
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

  // try {
  //   await readXlsxFile(__dirname + '/excelfiles/materialmaster.xlsx')
  //     .then((rows, errors) => {
  //       console.log(rows[0,1]);
  //     })
  // } catch (err) {
  //   console.log(err);
  // }

  // // Readable Stream.
  // readXlsxFile(fs.createReadStream('/path/to/file')).then((rows) => {
  //   rows.forEach(row => console.log(row));
  // })
}
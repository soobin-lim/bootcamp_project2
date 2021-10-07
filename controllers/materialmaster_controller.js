const import_excel = require('./controllers/materialmaster/import_excel');

var kiacode;

exports.index = (req, res) => {
  try {
    var jsondata = Promise.resolve(import_excel());
    
    // jsondata.then(function (data) {
    //   // console.log(JSON.stringify(data)); //working good..
    //   kiacode = JSON.stringify(data);
    jsondata.then(function (result) {
      console.log('result type', typeof result);
      console.log(result.rows[result.rows.length-1]);   //504 materials..
      kiacode = result.rows[result.rows.length-1];
      res.render('masterdata/materialmaster', {kiacode: kiacode});
    });

    // }, function (err) {
    //   console.log(err);
    //   res.render("Reading excel file failed");
    // });
  } catch (err) {
    console.log(err);
  }
}

//sample
// "material":"28791-F3000","description":"PNL-HEAT PROTECTOR FR","pgn":"P287","pgndescription":"PNL-HEAT PROTECTOR FR","pac":"3000","carmodel":"DL","standardpack":48
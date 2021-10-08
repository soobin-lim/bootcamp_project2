const db = require('../../../../models/materialmaster/KiaMaterial'); // import a model
// const KiaMaterial = db.tutorials
const KiaMaterial = db;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    
    console.log(path)

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      console.log(rows[1]);
      let kiamaterials = [];

      rows.forEach((row) => {
        let kiamaterial = {
          material: row['material'],
          sapmaterial: row['sapmaterial'],
          description: row['description'],
          pac: row['pac'],
        };

        kiamaterials.push(kiamaterial);
      });

      KiaMaterial.bulkCreate(kiamaterials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

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
  upload,
  getKiaMaterials,
};
// /api/materialmaster/
// This file contains all api(controllers) of materialmaster.handlebars

const router = require('express').Router(); //   /kiamaterial
// get file lists(not used)
// const controller = require("../fileuploader/controller/file.controller");


// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;
// get file lists
// const read_uploads_filelist = require('./read_uploads_filelist');


// Scheme and mysql function
const kia_material_sync_find = require("./kia_material_sync_find");
const sap_material_sync_find = require("./sap_material_sync_find");
const { stringify } = require('querystring');

// /api/materialmaster/uploadkiamaterials
router.post('/uploadkiamaterials', async (req, res) => await kia_material_sync_find.upload_kia_materials(req, res));
// /api/materialmaster/uploadsapmaterials
router.post('/uploadsapmaterials', async (req, res) => await sap_material_sync_find.upload_sap_materials(req, res));

const render_material_master = async (req, res, next) => {
  const kia_materials = await kia_material_sync_find.getKiaMaterials(req, res);
  const sap_materials = await sap_material_sync_find.getSapMaterials(req, res);

  var kia_materials_plain_true = {};
  var sap_materials_plain_true = {};

  if (!kia_materials || !sap_materials) {
    console.log('No kia_materials or No sap_materials!');
  } else {
    kia_materials_plain_true = kia_materials.get({ plain: true });
    sap_materials_plain_true = sap_materials.get({ plain: true });
  }
  // util.promisify() Demo example

  // Importing the fs and util modules
  const util = require('util')
  const fs = require('fs')

  // Changing from callback to promise based
  const readdir = util.promisify(fs.readdir)
  var files = {};
  // Reading files
  const readFiles = async (path) => {
    files = await readdir(path)
    // Printing current working directory
    console.log('async files:', files) //Print all files on current working directory
    console.log(process.cwd())
  }
  const path = require('path');

  // const directoryPath = path.join(__dirname, '../../../../public/assets/uploads');

  readFiles(process.cwd()+'/public/assets/uploads/').then((val) => {
    console.log('112233');
    console.log(files)
    files = files.filter((file)=> file.includes('xls'));
    res.render('masterdata/materialmaster',
      {
        "kiamaterials": kia_materials_plain_true,
        "sapmaterials": sap_materials_plain_true,
        filelist: files,
      }
    )
  }
  ).catch(err => {   // process.cwd
    console.log(err)
  })
  console.log('type of files:', typeof files);
  console.log('type of files2: ', typeof stringify(files));
  // var files= ["1", "2"];
  // res.render('masterdata/materialmaster',
  //   {
  //     "kiamaterials": kia_materials_plain_true,
  //     "sapmaterials": sap_materials_plain_true,
  //     filelist: files,
  //   }
  // )
};
router.get('/', render_material_master);

exports.render_material_master = render_material_master;
module.exports = router;
// just - note
// router.use('/', kiaMaterialRoutes);
// router.post("/upload", upload.single("file"), excelController.upload);  //   /kiamaterial/upload // doesn't work // not used
// http://localhost:3000/api/materialmaster/upload      // doesn't work // not used
// const kiaMaterialRoutes = require('./99 not used kiamaterialroute');



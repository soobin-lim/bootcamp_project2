const router = require('express').Router(); //   /kiamaterial
const kia_material_sync_find = require("./kia_material_sync_find");
const sap_material_sync_find = require("./sap_material_sync_find");
// const { stringify } = require('querystring');
// const path = require('path');   // be careful in deleting require('path'), it may stops app..
const db = require('../../../../models/');
const util = require('util')
const fs = require('fs')
const readdir = util.promisify(fs.readdir)
// const urlsetting = require(process.cwd()+'global')
console.log(process.cwd()+'global');
// router setting

// /api/materialmaster/uploadkiamaterials
router.post('/uploadkiamaterials', async (req, res) => await kia_material_sync_find.upload_kia_materials(req, res));

// /api/materialmaster/uploadsapmaterials
router.post('/uploadsapmaterials', async (req, res) => await sap_material_sync_find.upload_sap_materials(req, res));

// /api/materialmaster/getonlykiamaterials
router.get('/getonlykiamaterials', kia_material_sync_find.getOnlyKiaMaterials);

//  /api/materialmaster/getonlysapmaterials
router.get('/getonlysapmaterials', sap_material_sync_find.getOnlySapMaterials);

//  /api/materialmaster/getonlysapandkiamaterials
router.get('/getonlysapandkiamaterials', sap_material_sync_find.getOnlySapAndKiaMaterials);



// rendering 

const render_material_master = async (req, res) => {
  // materialize.Autocomplete();

  var files1 = {};
  const readFiles1 = async () => {
    files1 = await db.kiamaterial.findAll({ raw: true });
  }

  var kia_materials_promise = new Promise((resolve, reject) => {
    readFiles1().then((val) => {
      if (val == undefined) { };   // yes it is undefined
      resolve(files1);
      return files1;
    }).catch((error) => {
      console.log('q33', error, 'q33'); reject()
      return error;
    });
  }).catch((error) => {
    console.log('q44', error, 'q44');
    return error;
  });

  var files2 = {};

  const readFiles2 = async () => {
    files2 = await db.kiaandsapmaterial.findAll({ raw: true });
  }
  var kia_and_sap_materials_promise = new Promise((resolve, reject) => {
    readFiles2().then((val) => {
      if (val == undefined) { };   // yes it is undefined
      resolve(files2);    // resolve is working I guess..
      return files2;
    }).catch((error) => {
      console.log('q33', error, 'q33'); reject()
      return error;
    });
  }).catch((error) => {
    console.log('q44', error, 'q44');
    return error;
  });

  // Changing from callback to promise based
  var files = {};
  // Reading files
  const readFiles = async (path) => {
    files = await readdir(path)
  }
  var file_list_promise = new Promise((resolve, reject) => {
    readFiles(process.cwd() + '/public/assets/uploads/').then((val) => {
      if (val == undefined) { };   // yes it is undefined
      files = files.filter((file) => file.includes('xls'));
      resolve(files);
      return files;
    }).catch((error) => {
      console.log(error, 'q3'); reject()
      return error;
    });
  }).catch((error) => {
    console.log(error, 'q4');
    return error;
  });

  Promise.all([kia_materials_promise, kia_and_sap_materials_promise, file_list_promise])
    .then((values) => {
      let kiacode = values[0];
      let sapandkiacode = values[1];
      let filelist = values[2];
      // console.log(values[0][0], values[1][0], values[2], 'three');
      // console.log("three promises in materialmaster are done")
      // console.log(typeof values[1], typeof values[1][0], typeof JSON.stringify(values[1][0]))
      res.render('masterdata/materialmaster',
        {
          kiamaterials: kiacode.slice(0, 4),
          sapmaterials: sapandkiacode.slice(0, 4),
          filelist: filelist,
          // Promise.all three promises,
        }
      )
    });
};
router.get('/', render_material_master);

exports.render_material_master = render_material_master;
module.exports = router;


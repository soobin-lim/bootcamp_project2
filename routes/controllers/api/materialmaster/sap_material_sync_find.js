const db = require('../../../../models/index.js'); // import a db
const path = require('path');
const read_excel_sap_material_master_schema = require('./read_excel_sap_material_master_schema');

const upload_sap_materials = async (req, res) => {

  console.log(req.body, "this is sap material_sync_find -> Only excel file is allowed");

  const filename = req.body.filename;
  if (filename.includes('xlsx') || filename.includes('xls')) {
    console.log('it includes xlsx or xls');
  } else {
    res.status(500).send({ message: "It is not an excel file", err: error.message });
  }

  let excel_file_path =
    path.join(__dirname + "../../../../../public/assets/uploads/" + req.body.filename);
  console.log(excel_file_path);
  let resolved_excel_file_data = await myfunction(excel_file_path);  // pending (Promise)
  console.log(resolved_excel_file_data);

  try {
    // await db.kiaandsapmaterial.bulkCreate(resolved_excel_file_data)
    await resolved_excel_file_data.forEach((row) => {
      if (row.sapmaterial != undefined && row.material != undefined) {
        db.kiaandsapmaterial.create(row);
      }
      // console.log(row.status, row.material, row.sapmaterial)
    })
      .then(() => {
        res.status(200).send({
          message: "Sync(SapMaterial) is finished: "
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Fail to import data into database!",
          error: error.message,
        });
      });
  } catch (err) {
    console.log(err);
  }
}

const myfunction = async function (excel_file_path) {
  var retrived_data;
  try {
    var jsondata = await Promise.resolve(read_excel_sap_material_master_schema(excel_file_path)).
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

const getOnlySapMaterials = function (req, res) {

  var get_sap_kia_materials_sub_data
  const getSapMaterials_subFunction = async function () {
    get_sap_kia_materials_sub_data
      = await db.kiaandsapmaterial.findAll({ raw: true, attributes: ['sapmaterial'] });
    get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.map(v => v.sapmaterial);
    get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.filter(v => v[0] == "J");
    console.log(get_sap_kia_materials_sub_data);
    return get_sap_kia_materials_sub_data;
  }

  const getSapMaterialsPromise = new Promise((resolve, reject) => {
    getSapMaterials_subFunction()
      .then(() => {
        resolve(get_sap_kia_materials_sub_data)
      })
      .catch((err) => {
        console.log(err + 'getkiamaterials_')
        reject();
      })
  })

  getSapMaterialsPromise.then((val) => {
    // console.log(val); 
    res.json(val);
  });
}

const getOnlySapAndKiaMaterials = function (req, res) {

  var get_sap_kia_materials_sub_data
  const getSapMaterials_subFunction = async function () {
    get_sap_kia_materials_sub_data
      = await db.kiaandsapmaterial.findAll({ raw: true, attributes: ['material', 'sapmaterial'] });
    get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.filter(v => v.sapmaterial[0]=="J");
    // get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.map(v => {
    //   let o = {};
    //   let key = v.material;
    //   let value = v.sapmaterial;
    //   o[key] = value;
    //   return o;
    // });

    // get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.filter(v => v.[0]=="J");
    console.log(get_sap_kia_materials_sub_data);
    return get_sap_kia_materials_sub_data;
  }

  const getSapMaterialsPromise = new Promise((resolve, reject) => {
    getSapMaterials_subFunction()
      .then(() => {
        resolve(get_sap_kia_materials_sub_data)
      })
      .catch((err) => {
        console.log(err + 'getkiamaterials_')
        reject();
      })
  })

  getSapMaterialsPromise.then((val) => {
    // console.log(val); 
    res.json(val);
  });
}


module.exports = {
  upload_sap_materials,
  getOnlySapMaterials,
  getOnlySapAndKiaMaterials
};
const db = require('../../../../models/index.js'); // import a db
const path = require('path');
const read_excel_sap_material_master_schema = require('./read_excel_sap_master_schema');
const read_excel_kia_material_master_schema = require('./read_excel_kia_master_schema');

const { Op } = require("sequelize");

async function findKiaMaterialsUsingGroupName(groupName) {
  let kiamaterials = await db.kiamaterial.findAll({
    // attributes: [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'description'],
    // attributes: [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'description'],
    raw: true,
    where: {
      description: {
        [Op.substring]: groupName,
      }
    }
  })
  return kiamaterials;
}
const upload_masters = async (req, res) => {

  console.log(req.body, "this is sap material_sync_find -> Only excel file is allowed");

  const filename = req.body.filename;
  console.log('filename :' + filename)
  if (filename.includes('xlsx') || filename.includes('xls')) {
    console.log('Yes, it includes xlsx or xls');
  } else {
    res.status(500).send({ message: "It is not an excel file", err: error.message });
  }

  let excel_file_path =
    path.join(__dirname + "../../../../../public/assets/uploads/" + req.body.filename);
  console.log('excel file path : ' + excel_file_path);
  let resolved_excel_file_data = await myfunction(excel_file_path, filename);  // pending (Promise)
  console.log('excel file data : ' + resolved_excel_file_data);

  try {
    // await db.kiaandsapmaterial.bulkCreate(resolved_excel_file_data)
    if (resolved_excel_file_data == undefined) {
      console.log('undefined error')
      res.status(500).send({
        message: "resolved_excel_file_data is undefined"
      })
    } else {
      const response = await resolved_excel_file_data.forEach((row) => {
        if (req.body.filename.includes('zppr')) {
          console.log('zppr')
          if (row.sapmaterial != undefined && row.material != undefined) {
            if (row.sapmaterial.includes("JX")) {
              db.kiaandsapmaterial.create(row);
            }
          }
        } else {
          console.log('kmm')
          db.kiamaterial.create(row);
        }
        // console.log(row.status, row.material, row.sapmaterial)
      })
      // console.log(response);
    }

    res.status(200).send({
      message: "Sync(SapMaterial) is finished: "
    })
  } catch {
    (error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      })
    }

  }
}
const myfunction = async function (excel_file_path, filename) {
  let retrived_data;
  try {
    if (filename.includes('zppr')) {
      console.log('myfunction zppr')
      var jsondata = await Promise.resolve(read_excel_sap_material_master_schema(excel_file_path)).
        then(function (result) {
          console.log('result type', typeof result);
          console.log(result.rows[result.rows.length - 1]);   //504 materials..
          retrived_data = result.rows;  //array
          //pass a array[object, object]
          return retrived_data;
        })
    } else {
      console.log('myfunction kia')

      var jsondata = await Promise.resolve(read_excel_kia_material_master_schema(excel_file_path)).
        then(function (result) {
          console.log('reading kia material master excel')
          console.log('result type', typeof result);
          console.log(result.rows[result.rows.length - 1]);   //504 materials..
          retrived_data = result.rows;  //array
          // pass a array[object, object]
          return retrived_data;
        })
    }
  } catch (err) {
    console.log(err);
  } finally {
    console.log('done');
    console.log(jsondata);
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
    get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.filter(v => v.sapmaterial[0] == "J");
    // get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.map(v => {
    //   let o = {};
    //   let key = v.material;
    //   let value = v.sapmaterial;
    //   o[key] = value;
    //   return o;
    // });

    // get_sap_kia_materials_sub_data = get_sap_kia_materials_sub_data.filter(v => v.[0]=="J");
    // console.log(get_sap_kia_materials_sub_data);
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

const getDescription = async function (req, res) {
  let code = req.params.code;
  let kiamaterial = await db.kiamaterial.findOne({ where: { materialwithoutdash: code } })
  // console.log(kiamaterial.description);
  res.json({description: kiamaterial.description})
}

const check_and_update_kia_master = async function (req, res) {
  console.log('check')
  const kiacodes = await db.kiamaterial.findAll({ where: { sapmaterial: null } })
  // ------- result sample -------
  // material: '28791-F3000',
  // materialwithoutdash: '28791-F3000',
  // sapmaterial: null,
  // description: 'PNL-HEAT PROTECTOR FR',
  // pac: '3000'
  for (row of kiacodes) {
    let data = await db.kiaandsapmaterial.findOne({ where: { material: row.materialwithoutdash }, raw: true })
    // ------- result sample -------
    // status, material, sapmaterial
    if (data) {
      db.kiamaterial.update({
        sapmaterial: data.sapmaterial
      }, {
        where: {
          materialwithoutdash: row.materialwithoutdash
        }
      })
    }
  }
}

module.exports = {
  check_and_update_kia_master,
  upload_masters,
  getOnlySapMaterials,
  getOnlySapAndKiaMaterials,
  getDescription,
  findKiaMaterialsUsingGroupName
};
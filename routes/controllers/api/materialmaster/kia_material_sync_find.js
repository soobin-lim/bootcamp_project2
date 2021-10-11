const db = require('../../../../models/index.js'); 
const path = require('path');
// const KiaMaterial = db.tutorials
const read_excel_kia_material_master_schema = require('./read_excel_kia_material_master_schema');
// const KiaMaterial = db.KiaMaterial; //db.KiaMaterial

// const readXlsxFile = require("read-excel-file/node");

const upload_kia_materials = async (req, res) => {

  // if (req.file == undefined) {
  //   return res.status(400).send("Req.file is undefined");
  // }
  console.log(req.body, "this is kiamaterial_sync_find -> Only excel file is allowed");

  const filename = req.body.filename;
  console.log('filename check: ', filename)
  if (filename.includes('xlsx') || filename.includes('xls')) {
    console.log('it includes xlsx or xls');
  } else {
    console.log('');
  }

  let excel_file_path =
    path.join(__dirname + "../../../../../public/assets/uploads/" + req.body.filename);

  console.log(excel_file_path)
  let resolved_excel_file_data = await myfunction(excel_file_path);  // pending (Promise)
  console.log('resolved excel file data: undefined?' + resolved_excel_file_data);
  try {
    await db.kiamaterial.bulkCreate(resolved_excel_file_data)
      .then(() => {
        res.status(200).send({
          message: "Sync(KiaMaterial) is finished: "
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
  var jsondata={};
  try {
    jsondata = await Promise.resolve(read_excel_kia_material_master_schema(excel_file_path)).
      then(function (result) {
        // console.log('result type', typeof result);
        // console.log(result.rows[result.rows.length-1]);   //504 materials..
        retrived_data = result.rows;  //array
        //pass a array[object, object]
        console.log(retrived_data, '1q2w3e')
        if (retrived_data == undefined) console.log('kia material xlsx upload - undefined error')

        return retrived_data;
      })
  } catch{
    v => console.log(v);
  } finally {
    console.log('done');
    // console.log(jsondata);
    console.log(jsondata, 'jsondata');
    if(jsondata == undefined) console.log('error json data is undefined');
    return jsondata;

  }
}

const getOnlyKiaMaterials = function (req, res) {

  var get_kiamaterials_sub_data
  const get_kiamaterials_sub = async function () {
    get_kiamaterials_sub_data = await db.kiamaterial.findAll({ raw: true });
    get_kiamaterials_sub_data = get_kiamaterials_sub_data.map(v => v.material);
    return get_kiamaterials_sub_data;
  }

  const get_kiamaterials_promise = new Promise((resolve, reject) => {
    get_kiamaterials_sub()
      .then(() => {
        resolve(get_kiamaterials_sub_data)
      })
      .catch((err) => {
        console.log(err + 'getkiamaterials_')
        reject();
      })
  })

  get_kiamaterials_promise.then((val)=>{
    // console.log(val); 
    res.json(val);
  });

}

module.exports = {
  upload_kia_materials,
  getOnlyKiaMaterials,
};
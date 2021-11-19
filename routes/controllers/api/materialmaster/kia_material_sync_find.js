const db = require('../../../../models/index.js');
const path = require('path');
const read_excel_kia_material_master_schema = require('./read_excel_kia_master_schema');

const upload_kia_materials = async (req, res) => {

  console.log(req.body, "this is kiamaterial_sync_find -> Only excel file is allowed");

  const filename = req.body.filename;
  if (filename.includes('xlsx') || filename.includes('xls')) {
    console.log('Yes, it includes xlsx or xls');
  } else {
    res.status(500).send({ message: "It is not an excel file", err: error.message });
  }

  let excel_file_path =
    path.join(__dirname + "../../../../../public/assets/uploads/" + req.body.filename);
  console.log('excel file path : ' + excel_file_path);
  let resolved_excel_file_data = await myfunction(excel_file_path);  // pending (Promise)
  console.log('excel file data : ' + resolved_excel_file_data);

  try {
    if (resolved_excel_file_data != undefined) {
      const response = await resolved_excel_file_data.forEach((row) => {
        // console.log(row)
        db.kiamaterial.create(row);
        // console.log(row.status, row.material, row.sapmaterial)
      })
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

const myfunction = async function (excel_file_path) {
  let retrived_data;
  try {
    var jsondata = await Promise.resolve(read_excel_kia_material_master_schema(excel_file_path)).
      then(function (result) {
        console.log('result type', typeof result);
        console.log(result.rows[result.rows.length-1]);   //504 materials..
        retrived_data = result.rows;  //array
        //pass a array[object, object]
        return retrived_data;
      })
  } finally {
    console.log('done');
    console.log(jsondata);
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

  get_kiamaterials_promise.then((val) => {
    // console.log(val); 
    res.json(val);
  });

}

module.exports = {
  upload_kia_materials,
  getOnlyKiaMaterials,
};
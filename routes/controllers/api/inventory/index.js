const Sequelize = require('sequelize');
const router = require('express').Router(); //   /kiamaterial
const db = require('../../../../models/');


const render_inventory = async (req, res) => {
  let groups = await db.group.findAll({
    raw: true
  })
  console.log(groups)
  // kiamaterials = JSON.stringify({kiamaterials: kiamaterials});
  // console.log(kiamaterials)
  res.render('report/inventory', {
    groups: groups
  });
}

router.get('/', render_inventory);



module.exports = router;

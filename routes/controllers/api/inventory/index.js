const Sequelize = require('sequelize');
const router = require('express').Router(); //   /kiamaterial
const db = require('../../../../models/');

const render_inventory = async (req, res) => {
  let kiamaterials = await db.kiamaterial.findAll({
    // attributes: [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'description'],
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('description')), 'description'],

    raw: true
  })  
  // kiamaterials = JSON.stringify({kiamaterials: kiamaterials});
  // console.log(kiamaterials)
  res.render('report/inventory', {
    kiamaterials
  });
}

router.get('/', render_inventory);

module.exports = router;

const Sequelize = require('sequelize');
const router = require('express').Router(); //   /kiamaterial
const db = require('../../../../models/');
const master_api = require('../materialmaster/master_api')

async function getgroups() {
  // return just an array of descriptions
  let groups = await db.group.findAll({
    raw: true
  })
  groups = groups.map(group => group.name)
  return groups;
}

async function groupsAndKiaMaterialsFunction(groups) {
  let groupsAndKiaMaterials = {};

  for (let i = 0; i < groups.length - 1; i++) {
    if (groups[i] != undefined) {
      let kiamaterials = await master_api.findKiaMaterialsUsingGroupName(groups[i])
      kiamaterials.map(kiamaterial => {
        // kiamaterial.material
        kiamaterial['group'] = groups[i]
      })

      let groupName = groups[i];
      groupsAndKiaMaterials[groupName] = kiamaterials
    }
  }
  return groupsAndKiaMaterials;
}

const render_inventory = async (req, res) => {
  let groups = await getgroups()
  let groupsAndKiaMaterials = await groupsAndKiaMaterialsFunction(groups);

  res.render('report/inventory', {
    groups,
    groupsAndKiaMaterials
  });
}

router.get('/', render_inventory);



module.exports = router;

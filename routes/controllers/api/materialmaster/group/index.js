const router = require('express').Router(); //   /kiamaterial
const db = require('../../../../../models')


router.get('/', async (req, res) => {
  res.json(await db.group.findAll())
})
router.post('/', async (req, res) => {
  console.log(req.body)
  let groupName = req.body.name
  const find = await db.group.findOne({ where: { name: groupName } })
  if (find) {
    console.log("already exists")
    // res.send(
    //   // "<script>alert('This name already exists'); window.location.href='/materialmaster';</script>"
    //   "<script>alert('Created Successfully'); window.location.href='/materialmaster';</script>"

    // )
    // res.send(`alert("your alert message"); window.location.href = "/page_location"; `);
    res.status(500).send({ message: "This group name already exists" })
  } else {
    const response = await db.group.create({ name: groupName })
    console.log('but create anyway')
    // res.status(200).json(response);
    res.send(
      "<script>alert('Created Successfully'); window.location.href='/materialmaster';</script>"
    );
  }
})
module.exports = router;

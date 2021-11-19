const router = require('express').Router(); //   /kiamaterial
const db = require('../../../../../models')

router.post('/', async (req, res) => {
  console.log(req.body)
  let groupName = req.body.name
  const response = await db.group.create({ name:groupName })
  console.log(response);
  res.status(200).json(response);
  // res.send(
  //   "<script>alert('Created Successfully'); window.location.href='/home';</script>"
  // );
})

module.exports = router;

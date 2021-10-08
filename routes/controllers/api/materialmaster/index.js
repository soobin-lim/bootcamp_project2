const router = require('express').Router(); //   /kiamaterial
const kiaMaterialRoutes = require('./kiamaterialroute');

// get file lists
const controller = require("../fileuploader/controller/file.controller");

// Scheme and mysql function
const excelController = require("./excelcontroller");


router.use('/', kiaMaterialRoutes);
// router.post("/upload", upload.single("file"), excelController.upload);  //   /kiamaterial/upload // doesn't work // not used
// http://localhost:3000/api/materialmaster/upload      // doesn't work // not used

router.get("/showuploads", async (req, res) => {
  const fileLists = await controller.getListFiles();
  if (!fileLists) {
    res.status(404).json({ message: 'No fileLists!' });
    return;
  }
  const FileLists = fileLists.get({ plain: true });
  res.render('materialmaster', FileLists);
});
// materialmaster/api/showuploads
router.get("/kiamaterials", excelController.getKiaMaterials);   // findall kiamaterials

router.get("/kiamaterials/:material", excelController.getKiaMaterials);   // find one kiamaterials (pending)


module.exports = router;

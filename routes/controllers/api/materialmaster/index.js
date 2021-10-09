// /api/materialmaster
const router = require('express').Router(); //   /kiamaterial
const kiaMaterialRoutes = require('./kiamaterialroute');

// get file lists
const controller = require("../fileuploader/controller/file.controller");

// Scheme and mysql function
const kiamaterial_sync_find = require("./kiamaterial_sync_find");

// /api/materialmaster/uploadkiamaterials
router.post('/uploadkiamaterials', async (req, res) => await kiamaterial_sync_find.uploadkiamaterials(req, res));

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
router.get("/kiamaterials", kiamaterial_sync_find.getKiaMaterials);   // findall kiamaterials
router.get("/kiamaterials/:material", kiamaterial_sync_find.getKiaMaterials);   // find one kiamaterials (pending)


module.exports = router;

const router = require('express').Router(); //   /kiamaterial
const kiaMaterialRoutes = require('./kiamaterialroute');
const excelController = require("./excelcontroller");

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const upload = multer({ dest: './public/data/uploads/' })
var upload = multer({ dest: 'uploads/' });
// const upload = require("./upload");


router.post('/upload4', function(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log('Err: ', err);
      return;
    } else {
       console.log('req.file: ', JSON.stringify(req.file));  
       console.log('req.files: ', JSON.stringify(req.files));
       return;
    }
  })
});


router.use('/', kiaMaterialRoutes);
// router.post("/upload", upload.single("file"), excelController.upload);  //   /kiamaterial/upload
// http://localhost:3000/api/materialmaster/upload
router.get("/kiamaterials", excelController.getKiaMaterials);   // findall kiamaterials

router.get("/kiamaterials/:material", excelController.getKiaMaterials);   // find one kiamaterials (pending)


module.exports = router;


// router.post("/upload", (req, res) => {
//   // console.log(req.files);
//   // if (!req.files) {
//   //   return res.status(400).send("No files were uploaded.");
//   // }
//   const file = req.body.name;
//   // const file = req.files.myFile;
//   // const path = __dirname + "/" + file.name;
//   console.log('file', file)
//   // console.log('path', path)
//   const path = __dirname + "/" + file;

//   file.mv(path, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.send({ status: "success", path: path });
//   });
// });

router.post('/upload', function (req, res) {
  console.log(req.files.foo); // the uploaded file object
});



router.post("/upload2", (req, res) => {
  console.log(req.files);
  console.log(req.files.foo);
  return res.status(200).send("ok");
});

router.post("/upload3", (req, res) => {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream(__dirname + '/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      res.redirect('back');
    });
  });
});

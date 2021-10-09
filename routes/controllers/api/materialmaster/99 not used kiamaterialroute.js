// // sequelize findall findByPk

// const router = require('express').Router();
// // Import the model
// const KiaMaterial = require('../../../../models/materialmaster/KiaMaterial');    //need a test file

// // CREATE a KiaMaterial from user's input(excel file) or form input
// // Make a comparison if exists don't upload the code
// router.post('/', (req, res) => {
//   // Use Sequelize's `create()` method to add a row to the table
//   // Similar to `INSERT INTO` in plain SQL
//   KiaMaterial.create({
//     material: req.body.title,
//     sapmaterial: req.body.author,
//     description: req.body.description,
//     pac: req.body.pac
//   })
//     .then((newKiaMaterial) => {
//       // Send the newly created row as a JSON object
//       res.json(newKiaMaterial);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// // route to get one KiaMaterial
// router.get('/:material', async (req, res) => {
//   try{ 
//       const KiaMaterial = await KiaMaterial.findByPk(req.params.material);
//       if(!KiaMaterial) {
//           res.status(404).json({message: "No KiaMaterial with this Kia's material code!"});
//           return;
//       }
//       const kiamaterial = KiaMaterial.get({ plain: true });
//       res.render('kiamaterial', kiamaterial);   // will use kiamaterial information in kiamaterial.handlebars
//     } catch (err) {
//         res.status(500).json(err);
//     };     
// });

// module.exports = router;


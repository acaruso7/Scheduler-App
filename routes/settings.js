const express = require("express");
const router = express.Router();
const data = require('../data');
const settingsData = data.settings;

//get list of all settings
router.get("/", async (req, res) => {
  try {
    const settingsList = await settingsData.getAll();
    res.status(200).json(settingsList);
  } catch (e) {
      console.log(e)
    res.status(500).send();
  }
});

module.exports = router;


// //get a single animal object by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const animal = await animalData.get(req.params.id);
//     res.status(200).json(animal);
//   } catch (e) {
//     res.status(404).json({ error: "Animal not found" });
//   }
// });



// //add a single animal to the database (id auto generated)
// router.post("/", async (req, res) => {
//     const animalInfo = req.body; //this stores {name: name, animalType: animalType}
//     if (!animalInfo) {
//       res.status(400).json({ error: "You must provide data to create an animal" });
//       return;
//     }
//     if (!animalInfo.name) {
//       res.status(400).json({ error: "You must provide an animal name" });
//       return;
//     }
//     if (!animalInfo.animalType) {
//       res.status(400).json({ error: "You must provide an animalType" });
//       return;
//     }
//     const schema = new Schema({
//       name:String,
//       animalType:String,
//     })
//     try {
//       schema.validate(animalInfo)
//     } catch(e) {
//       res.status(400).json({ error: "Invalid object: must follow schema {name: String, animalType: String}" });
//     }
//     try {
//       const newAnimal = await animalData.create(
//         animalInfo.name,
//         animalInfo.animalType
//       );
//       res.status(200).json(newAnimal);
//     } catch (e) {
//       res.sendStatus(500);
//     }
// });



// //update name, type, or both for a single animal (find by id)
// router.put("/:id", async (req, res) => {
//   const animalInfo = req.body;
//   if (!animalInfo) { //if an empty object is submitted
//     res.status(400).json({ error: "You must provide data to update an animal" });
//     return;
//   }
//   if (!animalInfo.newName && !animalInfo.newType) { //if both field are empty
//     res.status(400).json({ error: "You must provide a either a new animal name, or a new animal type, or both" });
//     return;
//   }
//   const schema = new Schema({
//     newName:String,
//     newType:String,
//   })
//   try {
//     schema.validate(animalInfo)
//   } catch(e) {
//     res.status(400).json({ error: "Invalid object: must follow schema {newName: String, newType: String}" });
//   }
//   try {
//     await animalData.get(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: "Animal not found in database" });
//     return;
//   }
//   try {
//     const updatedAnimal = await animalData.update(req.params.id, animalInfo.newName, animalInfo.newType);
//     res.status(200).json(updatedAnimal);
//   } catch (e) {
//     console.log(e)
//     res.sendStatus(500);
//   }  
// });



// //delete an animal by id, along with any associated posts in the posts collection
// router.delete("/:id", async (req, res) => {
//   try {
//     await animalData.get(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: "Animal not found in database" });
//     return;
//   }
//   const deletedData = await animalData.get(req.params.id)
//   try {
//     const animalObject = await animalData.get(req.params.id)
//     const postList = animalObject.posts
//     for (i = 0; i < postList.length; i++) {
//       await postData.remove(postList[i]._id)
//     }
//     //res.sendStatus(200);
//   } catch (e) {
//     res.sendStatus(500);
//     return;
//   }
//   try {
//     await animalData.remove(req.params.id);
//     res.status(200).json({"deleted":true, "data":deletedData})
//   } catch (e) {
//     console.log(e)
//     res.sendStatus(500);
//     return;
//   }
// });




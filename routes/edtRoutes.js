const router = require("express").Router();

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/edtCtrl");

router.get("/getAll", getAll);
router.get("/getOne/:id", getOne);
router.post("/createOne", createOne);
router.put("/updateOne/:id", updateOne);
router.delete("/deleteOne/:id", deleteOne);

module.exports = router;

const Bills = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bills.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const newBills = new Bills(req.body);
    await newBills.save();
    res.status(200).json("Item added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/update-bill", async (req, res) => {
  try {
    await Bills.findOneAndUpdate({ _id: req.body.billId }, req.body);
    res.status(200).json("Bills Updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete-bill", async (req, res) => {
  try {
    await Bills.findOneAndDelete({ _id: req.body.billId });
    res.status(200).json("Bills Deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

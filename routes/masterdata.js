const { MasterData } = require("../models/masterdata");
const express = require("express");
const { moment } = require("moment");
const mongoose = require("mongoose");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const Data = await MasterData.find();

  if (!Data) {
    res.status(500).json({ success: false });
  }
  res.send(Data);
});

router.get(`/get-line-graph-data`, async (req, res) => {
  const lineGraphData = await MasterData.aggregate([
    { $group: { _id: "$occurred_date", count: { $sum: 1 } } },
  ]);

  if (!lineGraphData) {
    res.status(500).json({ success: false });
  }
  res.send(lineGraphData);
});

router.get(`/get-radar-graph-data`, async (req, res) => {
  const lineGraphData = await MasterData.aggregate([
    { $group: { _id: "$offense_category", count: { $sum: 1 } } },
  ]);

  if (!lineGraphData) {
    res.status(500).json({ success: false });
  }
  res.send(lineGraphData);
});

router.get(`/get-radar-graph-data-examine`, async (req, res) => {
  const lineGraphData = await MasterData.aggregate([
    { $group: { _id: "$clearance_group", count: { $sum: 1 } } },
  ]);

  if (!lineGraphData) {
    res.status(500).json({ success: false });
  }
  res.send(lineGraphData);
});



router.get(`/get-line-graph-data-filter`, async (req, res) => {
  let lineGraphData 
  if(req.query.startDate && req.query.endDate){
     lineGraphData = await MasterData.aggregate([
      { $match: {occurred_date:{$gte: req.query.startDate, $lt:req.query.endDate }}},
      { $group: { _id: "$occurred_date", count: { $sum: 1 } } },
    ]);
  }else{
   lineGraphData = await MasterData.aggregate([
      { $group: { _id: "$occurred_date", count: { $sum: 1 } } },
    ]);
  }


  if (!lineGraphData) {
    res.status(500).json({ success: false });
  }
  res.send(lineGraphData);
});

module.exports = router;



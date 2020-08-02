var express = require('express');
var router = express.Router();
const FeedbackModel = require('../models/Feedback');
const utility = require('../utility');

router.get('/all', async function (req, res, next) {
  try {
    res.json({feedbacks: await FeedbackModel.list()});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err.message
    });
  }
});

router.put('/create', async function (req, res, next) {
  try {
    const mediaFile = req.files ? req.files.mediaContent : null;
    const contentURL = await utility.uploadMedia(mediaFile);
    const {lat = '1', lon = '2', title, type, description} = req.body;
    let feedback = await FeedbackModel.create({
      lat,
      lon,
      contentURL,
      title,
      type,
      description
    });
    res.json({feedback});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err.message
    });
  }
});

router.put('/emergency', async function (req, res, next) {
  try {
    const {lat = '1', lon = '2'} = req.body;
    let feedback = await FeedbackModel.create({
      lat,
      lon,
      contentURL:'http://www.pngmart.com/files/7/Emergency-PNG-Transparent-Image.png',
      title:'Emergency',
      type:'Emergency',
      description:"Emergency request"
    });
    res.json({feedback});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err.message
    });
  }
});

module.exports = router;

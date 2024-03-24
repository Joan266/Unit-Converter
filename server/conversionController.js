const mongoose = require('mongoose');
const Conversion = require('./conversionModel.js');

module.exports = conversionController = {
  add: async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const conversion = await Conversion.create(data); 
      if (conversion) {
        console.log(`Conversion addition operation succeeded`);
        res.status(200).json({ error: null });
      } else {
        console.log(`Conversion addition operation failed`);
        res.status(404).json({ error: "Conversion create operation failed" }); 
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(400).json({
        error: 'Bad Request',
      });
    }
  },
  delete: async (req, res) => {
    const conversionId = req.params.id; 
    console.log(conversionId);
    try {
      const deletedConversion = await Conversion.findByIdAndDelete(conversionId); 
      if (deletedConversion) {
        res.status(200).json({ _id: deletedConversion._id }); 
      } else {
        res.status(404).json({ error: "Conversion not found" }); 
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(400).json({
        error: 'Bad Request',
      });
    }
  },
  conversions: async (req, res) => {
    try {
      const conversions = await Conversion.find().sort({ createdAt: -1 }); 
      if (conversions.length > 0) {
        res.status(200).json(conversions);
      } else {
        console.log(`Conversions empty`);
        res.status(200).json([]);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(400).json({
        error: 'Bad Request',
      });
    }
  }
};

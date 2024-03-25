const mongoose = require('mongoose');
const Conversion = require('./conversionModel.js');

module.exports = conversionController = {
  add: async (req, res) => {
    const data = req.body;
    try {
      const conversion = await Conversion.create({ _id: new mongoose.Types.ObjectId(), ...data}); 
      if (conversion) {
        console.log(`Conversion addition operation succeeded`);
        console.log(conversion);
        res.status(200).json({ _id: conversion._id });
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
    const { id } = req.params;
    try {
      
       const conversion = await Conversion.findById(id);
       console.log(conversion)
       if (!conversion) {
           return res.status(404).json({ error: 'Conversion not found' });
       }

       await Conversion.findByIdAndDelete(id);

       res.json({ message: 'Conversion deleted successfully' });
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
      console.log(conversions)
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

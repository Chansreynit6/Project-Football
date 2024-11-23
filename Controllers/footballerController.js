const Footballer = require("../models/footballerModels");
exports.createFootballer = async (req, res) => {
  try {
    const footballer = new Footballer(req.body);
    await footballer.save(); 
    res.status(200).json(footballer); 
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};


// getall
exports.getAllFootballers = async (req, res) => {
  try {
    const footballers = await Footballer.find();
    res.status(200).json(footballers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getFootballerById
exports.getFootballerById = async (req, res) => {
  try {
    const footballer = await Footballer.findById(req.params.id);
    if (!footballer)
      return res.status(404).json({ message: "Footballer not found" });
    res.status(200).json(footballer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update fooballer
exports.updateFootballer = async (req, res) => {
  try {
    const footballer = await Footballer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!footballer)
      return res.status(404).json({ message: "Footballer not found" });
    res.status(200).json(footballer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete footaballer
exports.deleteFootballer = async (req, res) => {
  try {
    const footballer = await Footballer.findByIdAndDelete(req.params.id);
    if (!footballer)
      return res.status(404).json({ message: "Footballer not found" });
    res.status(200).json({ message: "Footballer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Footballer = require("../models/footballerModels");



// create
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
        const footballers = await Footballer.find();  // Find all footballers in the database
        res.status(200).json(footballers); // Respond with the footballers in JSON format
    } catch (error) {
        res.status(500).json({ error: error.message }); // Respond with an error if something goes wrong
    }
};

// getFootballerById
exports.getAllFootballerById = async (req,res) =>
{
    try{
        const footballer = await Footballer.findById (req,params.id);
        if (!footballer) res.status(404).json({message:"Footballer not found"});
        res.status(200).json(footballer);

    } catch(error){
        res.status(500).json({error:error.message});
    }
};


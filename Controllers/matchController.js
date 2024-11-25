const footballmatch = require('../models/matchModel');


exports.createMatch = async (req, res) => {
    try {
      const { homeTeam, awayTeam, date, venue, status, referee, events, league } = req.body;
  
      // Validate required fields
      if ( !homeTeam || !awayTeam || !date || !venue || !league) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }
  
      // Create a new match
      const match = new footballmatch({
        homeTeam,
        awayTeam,
        date,
        venue,
        status: status || "upcoming",
        referee,
        events,
        league,
      });
  
      await match.save();
      res.status(201).json({ message: "Match created successfully", match });
    } catch (error) {
      res.status(500).json({ error: "Error creating match"});
    }
  };


exports.getAllMatch = async (req,res) => {
    try {
        const matchs = await footballmatch.find();
        return res.status(200).json({message: 'Match get successful',matchs});
    } catch(error){
        console.error(error);
        return res.status(500).json({error: 'Internal server error'})
    }
};

exports.getMatchId = async (req,res) => {
    try {
      const matchId = req.params.id;
        const matches = await footballmatch.findById(matchId);
        return res.status(200).json({message: 'Match get successful',matches});
    } catch(error){
        console.error(error);
        return res.status(500).json({error: 'Internal server error'})
    }
};

exports.updateMatch = async (req,res) => {
  try {
    const matchId = req.params.id;
    const updates = req.body;

    const matchUpdate = await footballmatch.findByIdAndUpdate(
      matchId,
      updates,
      { new: true, runValidators: true } // Return the updated document and validate
  );
  if (!matchUpdate) {
    return res.status(404).json({ message: 'Match not found' });
}
  
    return res.status(200).json({message: 'Match update successful',matchUpdate});
  } catch(error){
    console.error(error);
    return res.status(500).json({error: 'Internal server error'})
  }
}
exports.deleteMatch = async (req,res) => {
  try {
    const matchId = req.params.id;
    const matchDelete = await footballmatch.findByIdAndDelete(matchId);
    return res.status(200).json({message: 'match delete successful', matchDelete})
  }catch(error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'}) 
  }
}
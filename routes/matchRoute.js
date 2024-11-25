const express = require('express');
const { createMatch, getAllMatch, getMatchId, updateMatch, deleteMatch} = require('../Controllers/matchController');
const authorizeRole = require('../Modelware/authmodelware'); 
const matchroute = express.Router();
matchroute.post('/match', createMatch);
matchroute.get('/matchs', getAllMatch);
matchroute.get('/matchs/:id', getMatchId);
matchroute.put('/matchs/:id',updateMatch);
matchroute.delete('/matchs/:id',deleteMatch);




module.exports = matchroute;
const express = require('express');
const { createMatch, getAllMatch, getMatchId, updateMatch, deleteMatch} = require('../Controllers/matchController');
const matchroute = express.Router();
const {protect,adminOnly} = require('../Modelware/authmodelware');

matchroute.post('/match',protect,adminOnly, createMatch);
matchroute.get('/matchs',protect,adminOnly,getAllMatch);
matchroute.get('/matchs/:id', protect,adminOnly,getMatchId);
matchroute.put('/matchs/:id',protect,adminOnly,updateMatch);
matchroute.delete('/matchs/:id',protect,adminOnly,deleteMatch);




module.exports = matchroute;